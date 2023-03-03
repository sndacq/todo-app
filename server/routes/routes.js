const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../model/user');
const Todo = require('../model/todo');
const Comment = require('../model/comment');

const auth = require("../middleware/auth");

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
      return;
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { userId: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
      return;
    }
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { userId: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
      res.status(200).json(user);
      return;
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

// Todo Methods
// Get All Todos
router.get('/todos', auth, async (req, res) => {
  try{
    const { userId } = req.user;
    const user = await User.findById(userId);

    const data = await Todo.find({ user });
    res.json(data);
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
});


//Get Todo by ID
router.get('/todos/:id', auth, async (req, res) => {
  try{
    const { userId } = req.user;
    const user = await User.findById(userId);
    const data = await Todo.findById(req.params.id);
    
    if (data.user.valueOf() === user.id) {
      res.json(data);
    } else res.status(400).json({});
    
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

//Create Todo
router.post('/todos', auth,  async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);

    const todoDetails = req.body;
    const newTodo = new Todo({...todoDetails, user: user._id});

    const dataToSave = await newTodo.save();

    res.status(200).json(dataToSave);
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
});

//Update Todo by ID
router.put('/todos/:id', auth, async (req, res) => {
  try {
      const id = req.params.id;
      const updatedData = req.body;
      const options = { new: true };

      const result = await Todo.findByIdAndUpdate(
        id, updatedData, options
      );
      res.send(result)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})

//Delete Todo by ID
router.delete('/todos/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Todo.findByIdAndDelete(id);
    res.send(`Document with ${data.email} has been deleted..`);
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
});

// Comment Methods
// Get All Comments
router.get('/todos/:todoId/comments', auth, async (req, res) => {
  try{
    const _id = req.params.todoId;

    const { userId } = req.user;
    const user = await User.findById(userId);

    const todoData = await Todo.findOne({_id, user: user._id});

    const comments = todoData?.comments.map(item => item._id)
    const records = await Comment.find({ '_id': { $in: comments } });
    res.json(records);
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
})

// Not needed
// Get Comment by ID
router.get('/comments/:id', auth, async (req, res) => {
  try{
    const { id } = req.params;
    const { userId } = req.user;

    const user = await User.findById(userId);
    const todoData = await Todo.findOne({user: user._id, comments: { "$in" : [id]}});

    if (todoData) {
      const data = await Comment.findById(id);
      res.json(data);
    } else res.status(400).json({});    
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

//Create comment by todoId
router.post('/todos/:todoId/comments', auth, async (req, res) => {
  try {
      const todoId = req.params.todoId;
      const todo = await Todo.findById(todoId);

      const data = new Comment({
        comment: req.body.comment,
        todo: todo._id,
      });

      const dataToSave = await data.save();
      await Todo.updateOne(
        todo,
        {
          $push: {
            comments: data
          }
        },
        { new: true, useFindAndModify: false }
      );
      res.status(200).json(dataToSave);
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
});

//Update Todo by ID
router.put('/todos/:todoId/comments/:id', auth, async (req, res) => {
  try {
      const { id } = req.params;
      const updatedData = req.body;
      const options = { new: true };

      const result = await Comment.findByIdAndUpdate(
          id, updatedData, options
      );
      res.send(result)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})

//Delete Comment by ID
router.delete('/todos/:todoId/comments/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Comment.findByIdAndDelete(id);
    res.send(`Document with ${data.email} has been deleted..`);
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router;
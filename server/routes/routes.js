const express = require('express');
const router = express.Router();
const User = require('../model/user');
const Todo = require('../model/todo');
const Comment = require('../model/comment');
const mongoose = require('mongoose');

// Register
router.post('/register', async (req, res) => {
  const data = new User({
    email: req.body.email,
    password: req.body.password
  });
  try{
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  }
  catch(error){
    res.status(400).json({message: error.message});
  }
});

// Login
router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let reqData;
  if (email.length > 0 && password.length > 0) {
    reqData = {
      email: email,
      password: password
    };
  } else res.json({ status: 0, message: err });

  try{
    const data = await User.findOne(reqData);
    res.json(data);
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
});

// Todo Methods
// Get All Todos
router.get('/todos', async (req, res) => {
  try{
    const data = await Todo.find();
    res.json(data)
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
})

//Get Todo by ID
router.get('/todos/:id', async (req, res) => {
  try{
    const data = await Todo.findById(req.params.id);
    res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

//Create Todo
router.post('/todos', async (req, res) => {
  try {
      const newTodo = req.body;
      const data = new Todo(newTodo);

      const dataToSave = await data.save();
      res.status(200).json(dataToSave);
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
});

//Update Todo by ID
router.put('/todos/:id', async (req, res) => {
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
router.delete('/todos/:id', async (req, res) => {
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
router.get('/todos/:todoId/comments', async (req, res) => {
  try{
    const todoId = req.params.todoId;
    const data = await Todo.findById(todoId);

    const comments = data.comments.map(item => item._id)
    const records = await Comment.find({ '_id': { $in: comments } });
    res.json(records);
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
})

//Get Comment by ID
router.get('/comments/:id', async (req, res) => {
  try{
    const data = await Comment.findById(req.params.id);
    res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

//Create comment by todoId
router.post('/todos/:todoId/comments', async (req, res) => {
  try {
      const todoId = req.params.todoId;
      const todo = await Todo.findById(todoId);

      const data = new Comment({
        comment: req.body.comment,
        todo,
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
router.put('/todos/:todoId/comments/:id', async (req, res) => {
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
router.delete('/todos/:todoId/comments/:id', async (req, res) => {
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
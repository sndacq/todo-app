const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: {
    required: false,
    type: String
  },
  description: {
    required: false,
    type: String
  },
  status: {
    required: false,
    type: Boolean
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
}, { timestamps: true });

todoSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Todo', todoSchema);
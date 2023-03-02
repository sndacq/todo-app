const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  todos: [{
    type: Schema.Types.ObjectId,
    ref: "Todo"
  }]
})

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('User', userSchema);
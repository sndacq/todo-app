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
  token: { type: String }
})

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('User', userSchema);
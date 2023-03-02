const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: {
        required: false,
        type: String
    },
    todo: {
      type: Schema.Types.ObjectId,
      ref: "Todo"
    },
}, { timestamps: true });

commentSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Comment', commentSchema);
const { model, Schema } = require('mongoose');

const booksSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  story: {
    type: String,
    required: true,
  },
  userId: String,
  username: String,
  published: {
    type: Date,
    default: Date.now,
  }
});

module.exports = model('Books', booksSchema);
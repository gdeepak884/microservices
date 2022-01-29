const { model, Schema } = require('mongoose');

const interactionSchema = new Schema({
  bookId: {
    type: String,
    required: true,
  },
  reads: [
    {
      username: String,
      readAt: String
    }
  ],
  likes: [
    {
      username: String,
      likedAt: String
    }
  ]
});

module.exports = model('Interactions', interactionSchema);
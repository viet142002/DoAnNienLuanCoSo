const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    images: {
      type: Array,
    },
    content: {
      type: String,
      require: true,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

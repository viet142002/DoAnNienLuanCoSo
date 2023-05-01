const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
      trim: true,
      min: 2,
      max: 50,
    },
    fullName: {
      type: String,
      require: true,
      trim: true,
      min: 2,
      max: 30,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      min: 6,
      max: 50,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    story: {
      type: String,
      default: '',
      max: 250,
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/dpayvmrjo/image/upload/v1682830545/ViNet/xef51ibbrghxkzuufxxt.webp',
    },
    role: {
      type: String,
      default: 'user',
    },
    mobile: {
      type: String,
      default: '',
    },
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

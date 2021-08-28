const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
      minLength: 10,
    },
    description: {
      type: String,
      required: true,
      maxLength: 20000,
      trim: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    userName: String,
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;

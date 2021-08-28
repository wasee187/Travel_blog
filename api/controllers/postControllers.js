const Post = require('../models/Post');
const { post } = require('../routes/auth');
//CREATING NEW POST
const newPostController = async (req, res) => {
  const post = new Post(req.body);

  try {
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update post
const updatePostController = async (req, res) => {
  try {
    const findPost = await Post.findById(req.params.id);

    if (req.body.userName === findPost.userName) {
      try {
        const updatePost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatePost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('You can only update your post');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete post controller
const deletePostController = async (req, res) => {
  try {
    const findPost = await Post.findById(req.params.id);
    if (req.body.userName === findPost.userName) {
      try {
        await findPost.delete();
        res.status(200).json('Post has been deleted successfully');
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('You can only delete your post');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET SINGLE post
const getSinglePostController = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET ALL POSTS CONTROLLER
const getAllPostsController = async (req, res) => {
  const userName = req.query.userName;
  const catName = req.query.cat;
  try {
    let postsArray;
    if (userName) {
      postsArray = await Post.find({ userName });
    } else if (catName) {
      postsArray = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      postsArray = await Post.find();
    }
    res.status(200).json(postsArray);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
  newPostController,
  updatePostController,
  deletePostController,
  getSinglePostController,
  getAllPostsController,
};

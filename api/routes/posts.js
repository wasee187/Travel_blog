const express = require('express');
const router = express.Router();

//REQUIRING CONTROLLERS
const {
  newPostController,
  updatePostController,
  deletePostController,
  getSinglePostController,
  getAllPostsController,
} = require('../controllers/postControllers');
//CREATE NEW POST
router.post('/', newPostController);
//UPDATE POST
router.put('/:id', updatePostController);
//DELETE POST
router.delete('/:id', deletePostController);
//GET SINGLE POST
router.get('/:id', getSinglePostController);

//GET ALL POSTS
router.get('/', getAllPostsController);
module.exports = router;

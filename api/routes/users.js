const express = require('express');
const router = express.Router();

//requiring controller
const {
  updateUserController,
  deleteUserController,
  getSingleUserController,
  getPostsController,
} = require('../controllers/userControllers');

//UPDATE
router.put('/:id', updateUserController);

//DELETE
router.delete('/:id', deleteUserController);

//single user
router.get('/:id', getSingleUserController);

//get posts
router.get('/:id/posts', getPostsController);

module.exports = router;

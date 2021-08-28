const express = require('express');
const router = express.Router();

//requiring controller
const {
  updateUserController,
  deleteUserController,
  getSingleUserController,
} = require('../controllers/userControllers');

//UPDATE
router.put('/:id', updateUserController);

//DELETE
router.delete('/:id', deleteUserController);

//single user
router.get('/:id', getSingleUserController);

module.exports = router;

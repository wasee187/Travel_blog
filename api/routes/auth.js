const express = require('express');
const router = express.Router();

//requiring controller
const {
  postRegisterController,
  postLoginController,
} = require('../controllers/authControllers');
//register routes
router.post('/register', postRegisterController);

//Login
router.post('/login', postLoginController);

module.exports = router;

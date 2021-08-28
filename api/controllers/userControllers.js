const bcrypt = require('bcrypt');
const User = require('../models/User');
//update user
const updateUserController = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json('You can update only your account!');
  }
};
//single user controller
const getSingleUserController = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};
//delete user
const deleteUserController = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      await user.remove();
      res.status(200).json('Information deleted successfully');
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json('You can delete only your account');
  }
};

module.exports = {
  updateUserController,
  deleteUserController,
  getSingleUserController,
};

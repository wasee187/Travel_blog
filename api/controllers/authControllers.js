//requiring user model
const User = require('../models/User');
const bcrypt = require('bcrypt');

const postRegisterController = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const postLoginController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(500).json('Information miss matched. Please try again!');
    } else {
      const validate = await bcrypt.compare(req.body.password, user.password);
      if (!validate) {
        res.status(500).json('Information miss matched. Please try again!');
      } else {
        const { password, ...others } = user._doc;
        res.status(200).json(others);
      }
    }
  } catch (err) {
    res.send(500).json(err);
  }
};

module.exports = { postRegisterController, postLoginController };

const mongoose = require('mongoose');
const Post = require('./Post');

const UserSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: [25, 'FirstName must be less than 20 characters'],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      lowercase: true,
      validate: {
        validator(v) {
          return v.match(
            /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
          );
        },
      },
    },
    password: {
      type: String,
      required: true,
      maxLength: 100,
      minLength: 6,
      validate: {
        validator(v) {
          const passArray = ['12345', 'god123', 'password'];
          const isMatch = passArray.some((pass) => v.includes(pass));
          if (isMatch) {
            return false;
          }
        },
      },
    },
    status: {
      type: String,
      trim: true,
      maxLength: [200, 'FirstName must be less than 200 characters'],
    },
    profilePic: {
      type: String,
      default: '',
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

//virtual schema
UserSchema.virtual('posts', {
  ref: 'Post',
  localField: 'userName',
  foreignField: 'userName',
});

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

//deleting posts before deleting user
UserSchema.pre('remove', async function (next) {
  const user = this;
  const name = user.userName;

  await Post.deleteMany({
    userName: name,
  });
  next();
});
const User = mongoose.model('User', UserSchema);
module.exports = User;

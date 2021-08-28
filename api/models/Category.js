const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  catName: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;

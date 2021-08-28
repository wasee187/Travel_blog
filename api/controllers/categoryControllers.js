const Category = require('../models/Category');

const newCategoryController = async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCategory = await newCat.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllCategoryController = async (req, res) => {
  try {
    const allCat = await Category.find();
    res.status(200).json(allCat);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteCategoryController = async (req, res) => {
  const catId = req.params.id;
  try {
    await Category.findByIdAndDelete(catId);
    res.status(200).json('Category has been deleted successfully');
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  newCategoryController,
  getAllCategoryController,
  deleteCategoryController,
};

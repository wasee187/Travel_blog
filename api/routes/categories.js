const express = require('express');
const router = express.Router();

const Category = require('../models/Category');

const {
  newCategoryController,
  getAllCategoryController,
  deleteCategoryController,
} = require('../controllers/categoryControllers');

//POST CATEGORY
router.post('/', newCategoryController);
//GET ALL CATEGORY
router.get('/', getAllCategoryController);
//DELETE CATEGORY
router.delete('/:id', deleteCategoryController);

module.exports = router;

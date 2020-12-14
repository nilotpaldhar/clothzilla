import asyncHandler from 'express-async-handler';
import Category from '../../models/categoryModel.js';

// @desc Get all categories
// @route GET /api/product/categories
// @access PUBLIC
const getAllCategories = asyncHandler(async (req, res) => {
	const categories = await Category.find({});
	res.json(categories);
});

// @desc Get a single category
// @route GET /api/product/categories/:id
// @access PUBLIC
const getCategoryById = asyncHandler(async (req, res) => {
	const category = await Category.findById(req.params.id);

	if (!category) {
		res.status(404);
		throw new Error('Category not found');
	}

	res.json(category);
});

export { getAllCategories, getCategoryById };

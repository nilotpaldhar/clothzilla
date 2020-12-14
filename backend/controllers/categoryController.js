import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';

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

// @desc Create a new category
// @route POST /api/product/categories
// @access PRIVATE/ADMIN
const createCategory = asyncHandler(async (req, res) => {
	const { name } = req.body;
	const category = new Category({ name });
	await category.save();
	res.status(201).json(category);
});

// @desc Update a category
// @route PUT /api/product/categories/:id
// @access PRIVATE/ADMIN
const updateCategory = asyncHandler(async (req, res) => {
	const { name } = req.body;
	const category = await Category.findById(req.params.id);

	if (!category) {
		res.status(404);
		throw new Error('Category not found');
	}

	category.name = name || category.name;
	await category.save();
	res.json(category);
});

// @desc Delete a category
// @route DELETE /api/product/categories/:id
// @access PRIVATE/ADMIN
const deleteCategory = asyncHandler(async (req, res) => {
	const category = await Category.findById(req.params.id);

	if (!category) {
		res.status(404);
		throw new Error('Category not found');
	}

	await category.remove();
	res.json({ message: 'Category deleted successfully' });
});

export {
	getAllCategories,
	getCategoryById,
	createCategory,
	updateCategory,
	deleteCategory,
};

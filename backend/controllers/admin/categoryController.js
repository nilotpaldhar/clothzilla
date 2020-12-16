import asyncHandler from 'express-async-handler';
import Category from '../../models/categoryModel.js';

// @desc Create a new category
// @route POST /api/admin/categories
// @access PRIVATE/ADMIN
const createCategory = asyncHandler(async (req, res) => {
	const { name } = req.body;
	const category = new Category({ name });
	await category.save();
	res.status(201).json(category);
});

// @desc Update a category
// @route PUT /api/admin/categories/:id
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
// @route DELETE /api/admin/categories/:id
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

export { createCategory, updateCategory, deleteCategory };

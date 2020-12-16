import asyncHandler from 'express-async-handler';
import Category from '../../models/categoryModel.js';
import Product from '../../models/productModel.js';

// @desc Get all categories
// @route GET /api/categories
// @access PUBLIC
const getAllCategories = asyncHandler(async (req, res) => {
	const categories = await Category.find({});
	res.json(categories);
});

// @desc Get a single category
// @route GET /api/categories/:id
// @access PUBLIC
const getCategoryById = asyncHandler(async (req, res) => {
	const category = await Category.findById(req.params.id);

	if (!category) {
		res.status(404);
		throw new Error('Category not found');
	}

	res.json(category);
});

// @desc Get products related to the category
// @route GET /api/categories/:id/products
// @access PUBLIC
const getProductsByCategory = asyncHandler(async (req, res) => {
	const pageSize = 2;
	const category = await Category.findById(req.params.id);

	if (!category) {
		res.status(404);
		throw new Error('Category not found');
	}

	const count = await Product.countDocuments({
		category: category._id,
		isPublished: true,
	});

	const totalPages = Math.ceil(count / pageSize);
	const currentPage = Number(req.query.page) || 1;

	const products = await Product.find({
		category: category._id,
		isPublished: true,
	})
		.select('-description -reviews -user')
		.limit(pageSize)
		.skip(pageSize * (currentPage - 1));

	res.json({ numProducts: count, products, meta: { currentPage, totalPages } });
});

export { getAllCategories, getCategoryById, getProductsByCategory };

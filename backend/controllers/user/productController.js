import asyncHandler from 'express-async-handler';
import Product from '../../models/productModel.js';
import Category from '../../models/categoryModel.js';
import mongoose from 'mongoose';

// @desc Get all published products
// @route GET /api/products
// @access PUBLIC
const getAllActiveProducts = asyncHandler(async (req, res) => {
	const category = req.query.category || '';
	const pageSize = 20;
	let filterProduct = { isPublished: true };

	// Cheking whether category id is valid or not
	if (mongoose.Types.ObjectId.isValid(category) && category !== '') {
		filterProduct.category = category;
	}
	// Counting number documents
	const count = await Product.countDocuments(filterProduct);
	// Creating pagination
	const totalPages = Math.ceil(count / pageSize);
	const currentPage = Number(req.query.page) || 1;

	const products = await Product.find(filterProduct)
		.select('-description -reviews -user')
		.populate('category', 'name')
		.limit(pageSize)
		.skip(pageSize * (currentPage - 1));

	res.json({
		numProducts: count,
		products,
		meta: { currentPage, totalPages },
	});
});

// @desc Get a single product by ID
// @route GET /api/products/:slug/:id
// @access PUBLIC
const getActiveProductById = asyncHandler(async (req, res) => {
	const { id, slug } = req.params;
	const product = await Product.findOne({
		_id: id,
		slug,
		isPublished: true,
	}).populate('category', 'name');

	if (!product) {
		res.status(404);
		throw new Error('Product not found');
	}

	res.json(product);
});

// @desc Get related products
// @route GET /api/products/:slug/:id/related
// @access PUBLIC
const getRelatedProducts = asyncHandler(async (req, res) => {
	const { id, slug } = req.params;
	const limit = Number(req.query.limit) || 4;
	const product = await Product.findOne({ _id: id, slug, isPublished: true });

	if (!product) {
		res.status(404);
		throw new Error('Product not found');
	}

	const category = product.category;
	const relatedProducts = await Product.find({
		_id: { $ne: product._id },
		category,
		isPublished: true,
	})
		.select('-description -reviews -user')
		.limit(limit);
	console.log(limit);
	res.json(relatedProducts);
});

// @desc Get products by search query
// @route GET /api/products/search?query:searchQuery
// @access PUBLIC
const searchProducts = asyncHandler(async (req, res) => {
	const limit = Number(req.query.limit) || 20;
	const keywords = req.query.query
		? {
				name: {
					$regex: req.query.query,
					$options: 'i',
				},
				isPublished: true,
		  }
		: {};

	if (!req.query.query) {
		res.json({ searchResults: 0, products: [] });
		return;
	}

	const searchCount = await Product.countDocuments({ ...keywords }).limit(
		limit
	);
	const products = await Product.find({ ...keywords })
		.select('-description -reviews -user')
		.limit(limit);

	res.json({ meta: { searchResults: searchCount }, products });
});

export {
	getAllActiveProducts,
	searchProducts,
	getActiveProductById,
	getRelatedProducts,
};

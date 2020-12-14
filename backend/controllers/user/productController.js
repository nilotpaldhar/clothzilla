import asyncHandler from 'express-async-handler';
import Product from '../../models/productModel.js';

// @desc Get all published products
// @route GET /api/products
// @access PUBLIC
const getAllActiveProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({ isPublished: true }).select(
		'-description -reviews -user'
	);

	res.json(products);
});

// @desc Get a single product by ID
// @route GET /api/products/:slug/:id
// @access PUBLIC
const getActiveProductsById = asyncHandler(async (req, res) => {
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
	const product = await Product.findOne({ _id: id, slug, isPublished: true });

	if (!product) {
		res.status(404);
		throw new Error('Product not found');
	}

	const category = product.category;
	const relatedProducts = await Product.find({
		category,
		isPublished: true,
	}).select('-description -reviews -user');

	res.json(relatedProducts);
});

export { getAllActiveProducts, getActiveProductsById, getRelatedProducts };

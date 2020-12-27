import asyncHandler from 'express-async-handler';
import Product from '../../models/productModel.js';
import Category from '../../models/categoryModel.js';
import imageUploader from '../../utils/imageUploader.js';

// @desc Get all products (Both published and unpublished)
// @route GET /api/admin/products
// @access PRIVATE/ADMIN
const getAllProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({})
		.select('-description -reviews')
		.populate('category', 'name');

	res.json(products);
});

// @desc Create a new product
// @route POST /api/admin/products
// @access PRIVATE/ADMIN
const createProduct = asyncHandler(async (req, res) => {
	const categories = await Category.find({});
	const user = req.user._id;

	if (!categories || categories.length === 0) {
		res.status(400);
		throw new Error('No category found. Please create a category first');
	}

	const product = new Product({
		user,
		category: categories[0],
		name: 'Sample name',
		description: 'Sample description',
		listPrice: 0,
		discount: 0,
		stock: 0,
		tax: 0,
		image: process.env.PRODUCT_IMAGE_PLACEHOLDER,
	});

	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

// @desc Get a single product by ID
// @route GET /api/admin/products/:id
// @access PRIVATE/ADMIN
const getProductById = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);
	// const product = await Product.findById(id).populate('category', 'name');

	if (!product) {
		res.status(404);
		throw new Error('Product not found');
	}

	res.json(product);
});

// @desc Update a product
// @route PUT /api/admin/products/:id
// @access PRIVATE/ADMIN
const updateProduct = asyncHandler(async (req, res) => {
	const {
		category,
		name,
		description,
		listPrice,
		discount,
		stock,
		tax,
		isPublished,
	} = req.body;

	const product = await Product.findById(req.params.id);

	if (!product) {
		res.status(404);
		throw new Error('Product not found');
	}

	product.name = name || product.name;
	product.category = category || product.category;
	product.description = description || product.description;
	product.listPrice = listPrice || product.listPrice;
	product.discount = discount || product.discount;
	product.stock = stock || product.stock;
	product.tax = tax || product.tax;
	product.isPublished = isPublished === true ? isPublished : false;

	const updatedProduct = await product.save();
	res.json(updatedProduct);
});

// @desc Upload a product image
// @route POST /api/admin/products/:id/image
// @access PRIVATE/ADMIN
const uploadProductImage = asyncHandler(async (req, res) => {
	const file = req.body.image;
	const product = await Product.findById(req.params.id).populate(
		'category',
		'name'
	);

	if (!product) {
		res.status(404);
		throw new Error('Product not found');
	}

	if (!file) {
		res.status(400);
		throw new Error('Unable to upload! No file found for upload');
	}

	// Uploading file to cloudnary
	const uploadedImageUrl = await imageUploader(file, 'products', 600);

	// Saving uploaded image URL in product
	product.image = uploadedImageUrl;
	const updatedProduct = await product.save();

	res.json(updatedProduct);
});

// @desc Delete a product
// @route DELETE /api/admin/products/:id
// @access PRIVATE/ADMIN
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (!product) {
		res.status(404);
		throw new Error('Product not found');
	}
	await product.remove();
	res.json({ message: 'Product deleted successfully' });
});

export {
	getAllProducts,
	createProduct,
	getProductById,
	updateProduct,
	uploadProductImage,
	deleteProduct,
};

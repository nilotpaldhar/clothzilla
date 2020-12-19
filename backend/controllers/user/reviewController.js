import asyncHandler from 'express-async-handler';
import Product from '../../models/productModel.js';
import Review from '../../models/reviewModel.js';

// @desc Get all reviews related to a product
// @route GET /api/products/:productId/reviews
// @access PUBLIC
const getAllReviews = asyncHandler(async (req, res) => {
	const { productId } = req.params;
	const product = await Product.findById(productId).populate({
		path: 'reviews',
		populate: {
			path: 'user',
			select: 'name',
		},
	});

	if (!product) {
		res.status(404);
		throw new Error('Product not found');
	}

	// const reviews = await Review.find({ product: product._id })
	// 	.populate('user', 'name')
	// 	.sort({ createdAt: -1 });
	res.json(product.reviews);
});

// @desc Get a single review by ID related to a product
// @route GET /api/products/:productId/reviews/:reviewId
// @access PUBLIC
const getReviewById = asyncHandler(async (req, res) => {
	const { productId, reviewId } = req.params;
	const product = await Product.findById(productId)
		.select('reviews')
		.populate('reviews', 'rating title comment user product');

	if (!product) {
		res.status(404);
		throw new Error('Product not found');
	}

	const review = await Review.findOne({ _id: reviewId, product: product._id });

	if (!review) {
		res.status(404);
		throw new Error('Review not found');
	}

	res.json(review);
});

// @desc Create a new review for a product
// @route POST /api/products/:productId/reviews
// @access PRIVATE
const createReview = asyncHandler(async (req, res) => {
	const { productId } = req.params;
	const { rating, title, comment } = req.body;
	const product = await Product.findById(productId).populate(
		'reviews',
		'rating title comment user'
	);

	if (!product) {
		res.status(404);
		throw new Error('Product not found');
	}

	if (!product.isAuthorizeBuyer(req.user._id)) {
		res.status(400);
		throw new Error(
			'You are not authorized to write a review. Please purchase the product before write a review'
		);
	}

	if (product.isReviewed(req.user._id)) {
		res.status(400);
		throw new Error('You already reviewed this product');
	}

	const review = new Review({
		user: req.user._id,
		product: product._id,
		rating,
		title,
		comment,
	});

	await review.save();

	// Inserting newly created review to the related product
	product.reviews.unshift(review);
	// Increasing review count
	product.reviewCount = product.reviews.length;
	// Caculating product rating
	product.rating =
		product.reviews.reduce((acc, review) => review.rating + acc, 0) /
		product.reviews.length;

	await product.save();

	const createdReview = await Review.populate(review, {
		path: 'user',
		select: 'name',
	});

	res.status(201).json({ product, review: createdReview });
});

export { getAllReviews, getReviewById, createReview };

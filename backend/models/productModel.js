import mongoose from 'mongoose';
import slugGenerator from '../utils/slugGenerator.js';
import Review from './reviewModel.js';

import {
	calculateDisountedPrice,
	calculateTaxPrice,
	calculateSalesPrice,
} from '../utils/calculatePrice.js';

const productSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Category',
		},
		buyerList: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		name: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
		},
		image: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		listPrice: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
		},
		salePrice: {
			type: Number,
			min: 0,
		},
		discount: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
			max: 100,
		},
		tax: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
			max: 100,
		},
		taxPrice: {
			type: Number,
			min: 0,
		},
		stock: {
			type: Number,
			default: 0,
			min: 0,
		},
		reviewCount: {
			type: Number,
			default: 0,
		},
		reviews: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Review',
			},
		],
		rating: {
			type: Number,
			default: 0,
			min: 0,
			max: 5,
		},
		isPublished: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

// Checking whether a user is a authorized buyer or not
productSchema.methods.isAuthorizeBuyer = function (userId) {
	const product = this;
	return product.buyerList.includes(userId.toString());
};

// Checking whether a user is already reviewed a product or not
productSchema.methods.isReviewed = function (userId) {
	const product = this;
	const alreadyReviewed = product.reviews.find((review) => {
		if (review.user) {
			return review.user.toString() === userId.toString();
		} else {
			return false;
		}
	});
	return alreadyReviewed ? true : false;
};

// Hide buyerList from client
productSchema.methods.toJSON = function () {
	const product = this;
	const productObject = product.toObject();
	delete productObject.buyerList;
	return productObject;
};

// Generate slug
productSchema.pre('save', async function (next) {
	if (!this.isModified(['name'])) {
		next();
	}
	this.slug = slugGenerator(this.name);
});

// Calculate sale price and tax price
productSchema.pre('save', async function (next) {
	if (!this.isModified(['listPrice', 'discount', 'tax'])) {
		next();
	}

	const discountedPrice = calculateDisountedPrice(
		this.listPrice,
		this.discount
	);
	const taxPrice = calculateTaxPrice(discountedPrice, this.tax);

	this.salePrice = calculateSalesPrice(discountedPrice, taxPrice);
	this.taxPrice = taxPrice;
});

// Delete product reviews when product is removed
productSchema.pre('remove', async function (next) {
	const product = this;
	await Review.deleteMany({ product: product._id });
	next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;

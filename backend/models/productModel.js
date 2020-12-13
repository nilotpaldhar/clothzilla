import mongoose from 'mongoose';
import {
	calculateDisountedPrice,
	calculateTaxPrice,
	calculateSalesPrice,
} from '../utils/calculatePrice.js';
import slugGenerator from '../utils/slugGenerator.js';

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

const Product = mongoose.model('Product', productSchema);

export default Product;

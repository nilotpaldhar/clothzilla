import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from '../config/db.js';

// DB Models
import User from '../models/userModel.js';
import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import Review from '../models/reviewModel.js';
import Order from '../models/orderModel.js';

// Import Fake Data
import users from './data/users.js';
import categories from './data/categories.js';
import products from './data/products.js';

// Initialzed dotenv
dotenv.config();

// Connect database
connectDB();

const importUserData = async (sampleUsers) => {
	// Clear existing records
	await User.deleteMany();
	// Inserting records
	const createdUser = await User.insertMany(sampleUsers);
	return createdUser;
};

const importCategoryData = async (sampleCategories) => {
	// Clear existing records
	await Category.deleteMany();
	// Inserting records
	const createdCategories = await Category.create(sampleCategories);
	return createdCategories;
};

const importProductData = async (
	sampleProducts,
	createdUser,
	createdCategories
) => {
	// Clear existing records
	await Product.deleteMany();
	// Inserting records
	const modifiedProducts = sampleProducts.map((product) => {
		const rand = Math.floor(Math.random() * createdCategories.length);
		return {
			...product,
			user: createdUser[0],
			category: createdCategories[rand],
		};
	});
	const createdProducts = await Product.create(modifiedProducts);
	return createdProducts;
};

// Remove all data from DB
const destroyData = async () => {
	try {
		await Product.deleteMany();
		await Review.deleteMany();
		await Category.deleteMany();
		await User.deleteMany();
		await Order.deleteMany();

		console.log('Data Destroyed!'.green.inverse);
		process.exit();
	} catch (error) {
		console.log(`${error}`.red.inverse);
		process.exit(1);
	}
};

// Insert data into DB
const importData = async () => {
	try {
		// Insert users
		const createdUsers = await importUserData(users);

		// Insert categories
		const createdCategories = await importCategoryData(categories);

		// Insert products
		const createdProducts = await importProductData(
			products,
			createdUsers,
			createdCategories
		);

		console.log('Data Imported!'.green.inverse);
		process.exit();
	} catch (error) {
		console.log(`${error}`.red.inverse);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}

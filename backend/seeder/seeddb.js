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

const importData = async () => {
	try {
		// Clear existing data
		await User.deleteMany();
		await Category.deleteMany();
		await Product.deleteMany();

		// Insert users
		const createdUser = await User.insertMany(users);
		const masterUser = createdUser[0]._id;

		// Insert categories
		const createdCategories = await Category.create(categories);

		// Insert products
		const sampleProducts = products.map((product) => {
			const rand = Math.floor(Math.random() * createdCategories.length);
			return {
				...product,
				user: masterUser,
				category: createdCategories[rand],
			};
		});
		await Product.create(sampleProducts);

		console.log('Data Imported!'.green.inverse);
		process.exit();
	} catch (error) {
		console.log(`${error}`.red.inverse);
		process.exit(1);
	}
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

if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}

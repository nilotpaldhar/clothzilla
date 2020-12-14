import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Importing routes related to authentication
import authRoutes from './routes/authRoutes.js';
// Importing routes related to user
import productUserRoutes from './routes/user/productRoutes.js';
import categoryUserRoutes from './routes/user/categoryRoutes.js';

// Importing routes related to admin
import categoryAdminRoutes from './routes/admin/categoryRoutes.js';

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json());

// Authentication routes
app.use('/api/auth', authRoutes);

// Routes related to user
app.use('/api/products', productUserRoutes);
app.use('/api/product/categories', categoryUserRoutes);

// Routes related to admin
app.use('/api/admin/product/categories', categoryAdminRoutes);

app.get('/', (req, res) => {
	res.send('API is running...');
});

// Handling 404 errors
app.use(notFound);
// Handling generic errors
app.use(errorHandler);

// Starting server
const port = process.env.PORT || 5000;
app.listen(
	port,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${port}`.blue
			.underline
	)
);

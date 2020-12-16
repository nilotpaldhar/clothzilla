import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Importing routes related to authentication and user profile
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

// Importing routes related to user
import productUserRoutes from './routes/user/productRoutes.js';
import reviewUserRoutes from './routes/user/reviewRoutes.js';
import categoryUserRoutes from './routes/user/categoryRoutes.js';
import orderUserRoutes from './routes/user/orderRoutes.js';

// Importing routes related to admin
import categoryAdminRoutes from './routes/admin/categoryRoutes.js';
import productAdminRoutes from './routes/admin/productRoutes.js';
import userAdminRoutes from './routes/admin/userRoutes.js';
import orderAdminRoutes from './routes/admin/orderRoutes.js';

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Authentication & profile routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Routes related to user
app.use('/api/products', productUserRoutes);
app.use('/api/products', reviewUserRoutes);
app.use('/api/categories', categoryUserRoutes);
app.use('/api/myorders', orderUserRoutes);

// Routes related to admin
app.use('/api/admin/products', productAdminRoutes);
app.use('/api/admin/categories', categoryAdminRoutes);
app.use('/api/admin/users', userAdminRoutes);
app.use('/api/admin/orders', orderAdminRoutes);

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

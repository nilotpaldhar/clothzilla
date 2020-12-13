import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json());

// User authentication routes
app.use('/api/auth', userRoutes);

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

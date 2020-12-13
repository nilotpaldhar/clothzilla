import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// Middleware for authenticate users
const auth = asyncHandler(async (req, res, next) => {
	const { authorization } = req.headers;
	let token;

	if (authorization && authorization.startsWith('Bearer')) {
		try {
			token = authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			const user = await User.findOne({
				_id: decoded.id,
				'tokens.token': token,
			});

			if (!user) {
				throw new Error('Not authorized, token failed');
			}

			req.token = token;
			req.user = user;
			next();
		} catch (error) {
			console.error(error);
			res.status(401);
			throw new Error('Not authorized, token failed');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('Not authorized, no token');
	}
});

export { auth };

import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc Authenticate user and get token
// @route POST /api/auth/login
// @access PUBLIC
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// Find user by email
	const user = await User.findOne({ email });

	// Checking if user exists and has a valid password
	if (!user || !(await user.matchPassword(password))) {
		res.status(401);
		throw new Error('Invalid email or password');
	}

	// Checking if user account is active or not
	if (!user.isUserActive()) {
		res.status(401);
		throw new Error('Your account is deactivated, please contact admin');
	}

	// Generate token
	const token = await user.generateAuthToken();
	res.json({ user, token });
});

// @desc Register a new user
// @route POST /api/auth/register
// @access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	// Checking if user already exists or not
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error('Email address already exists');
	}

	// Create user
	const user = await User.create({ name, email, password });

	// Checking if user created successfully
	if (!user) {
		res.status(400);
		throw new Error('Invalid user data');
	}

	// Generate token
	const token = await user.generateAuthToken();
	res.status(201).json({ user, token });
});

// @desc Logout authenticated user
// @route POST /api/auth/logout
// @access PRIVATE
const logoutUser = asyncHandler(async (req, res) => {
	req.user.tokens = req.user.tokens.filter(
		(token) => token.token !== req.token
	);
	await req.user.save();
	req.user = null;
	req.tokens = null;
	res.json({ message: 'Succesfully logout' });
});

// @desc Remove all tokens from authenticated user
// @route POST /api/auth/logoutall
// @access PRIVATE
const logoutUserAll = asyncHandler(async (req, res) => {
	req.user.tokens = [];
	await req.user.save();
	req.user = null;
	req.tokens = null;
	res.json({ message: 'Succesfully logout from all devices' });
});

// @desc Get cuurently logged in user
// @route GET /api/auth/me
// @access PRIVATE
const getCurrentUser = asyncHandler(async (req, res) => {
	res.json(req.user);
});

// @desc Update authenticated user password
// @route PUT /api/auth/security
// @access PRIVATE
const updateUserPassword = asyncHandler(async (req, res) => {
	const { currentPassword, newPassword } = req.body;
	const user = await User.findById(req.user._id);

	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}

	if (!currentPassword || !newPassword) {
		res.status(400);
		throw new Error("Password don't match");
	}

	if (!(await user.matchPassword(currentPassword))) {
		res.status(400);
		throw new Error("Password don't match");
	}

	user.password = newPassword;
	await user.save();
	res.json({ message: 'Password updated succesfully' });
});

// @desc Deactivate user account
// @route PUT /api/auth/close
// @access PRIVATE
const closeUserAccount = asyncHandler(async (req, res) => {
	req.user.isActive = false;
	req.user.tokens = [];
	await req.user.save();
	req.user = null;
	req.token = null;
	res.json({ message: 'Closed account successfully' });
});

export {
	loginUser,
	registerUser,
	getCurrentUser,
	logoutUser,
	logoutUserAll,
	updateUserPassword,
	closeUserAccount,
};

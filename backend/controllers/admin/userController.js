import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';

// @desc Get all users
// @route GET /api/admin/user
// @access PRIVATE/ADMIN
const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find({ _id: { $ne: req.user._id } }).select(
		'-avatar'
	);
	res.json(users);
});

// @desc Set user as admin
// @route POST /api/admin/user/:id/admin
// @access PRIVATE/ADMIN
const setUserAsAdmin = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}
	user.isAdmin = true;
	const updatedUser = await user.save();
	res.json(updatedUser);
});

// @desc Unset user as admin
// @route POST /api/admin/user/:id/subscriber
// @access PRIVATE/ADMIN
const unsetUserAsAdmin = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}
	user.isAdmin = false;
	const updatedUser = await user.save();
	res.json(updatedUser);
});

// @desc Activate user account
// @route POST /api/admin/user/:id/activate
// @access PRIVATE/ADMIN
const activateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}
	user.isActive = true;
	const updatedUser = await user.save();
	res.json(updatedUser);
});

// @desc Deactivate user account
// @route POST /api/admin/user/:id/deactivate
// @access PRIVATE/ADMIN
const deactivateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}
	user.isActive = false;
	const updatedUser = await user.save();
	res.json(updatedUser);
});

export {
	getAllUsers,
	activateUser,
	deactivateUser,
	setUserAsAdmin,
	unsetUserAsAdmin,
};

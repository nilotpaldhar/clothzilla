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
// @route PUT /api/admin/user/:id/setadmin
// @access PRIVATE/ADMIN
const setUserAsAdmin = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}
	user.isAdmin = true;
	await user.save();
	res.json({ message: 'Succesfully set user as admin' });
});

// @desc Unset user as admin
// @route PUT /api/admin/user/:id/deactivate
// @access PRIVATE/ADMIN
const unsetUserAsAdmin = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}
	user.isAdmin = false;
	await user.save();
	res.json({ message: 'Succesfully unset user as admin' });
});

// @desc Activate user account
// @route PUT /api/admin/user/:id/activate
// @access PRIVATE/ADMIN
const activateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}
	user.isActive = true;
	await user.save();
	res.json({ message: 'User account activated successfully' });
});

// @desc Deactivate user account
// @route PUT /api/admin/user/:id/deactivate
// @access PRIVATE/ADMIN
const deactivateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}
	user.isActive = false;
	await user.save();
	res.json({ message: 'User acount deactivated successfully' });
});

export {
	getAllUsers,
	activateUser,
	deactivateUser,
	setUserAsAdmin,
	unsetUserAsAdmin,
};

import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import imageUploader from '../utils/imageUploader.js';
import avatarGenerator from '../utils/avatarGenerator.js';

// @desc Get authenticated user profile
// @route GET /api/profile
// @access PRIVATE
const getUserProfile = asyncHandler(async (req, res) => {
	res.json(req.user);
});

// @desc Update authenticated user profile name and email
// @route PUT /api/profile
// @access PRIVATE
const updateUserProfile = asyncHandler(async (req, res) => {
	const { name, email } = req.body;
	const duplicateUser = await User.findOne({
		email,
		_id: { $ne: req.user._id },
	});
	const user = await User.findById(req.user._id);

	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}

	if (duplicateUser) {
		res.status(400);
		throw new Error('This email address already exists');
	}

	user.name = name || user.name;
	user.email = email || user.email;
	const updatedUser = await user.save();

	res.json(updatedUser);
});

// @desc Get authenticated user shipping details
// @route GET /api/profile/shipping
// @access PRIVATE
const getUserShippingDetails = asyncHandler(async (req, res) => {
	res.json(req.user.shippingAddress);
});

// @desc Update authenticated user shipping details
// @route PUT /api/profile/shipping
// @access PRIVATE
const updateUserShippingDetails = asyncHandler(async (req, res) => {
	const { address, city, postalCode, country } = req.body;
	const user = await User.findById(req.user._id);

	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}

	user.shippingAddress.address = address || user.shippingAddress.address;
	user.shippingAddress.city = city || user.shippingAddress.city;
	user.shippingAddress.postalCode =
		postalCode || user.shippingAddress.postalCode;
	user.shippingAddress.country = country || user.shippingAddress.country;
	const updatedUser = await user.save();

	res.json(updatedUser.shippingAddress);
});

// @desc Get authenticated user avatar
// @route GET /api/profile/avatar
// @access PRIVATE
const getProfileAvatar = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id).select('name avatar');
	const avatarUrl = user.avatar ? user.avatar : avatarGenerator(user.name);
	res.json({ avatar_url: avatarUrl });
});

// @desc Upload avatar of authenticated user
// @route POST /api/profile/avatar
// @access PRIVATE
const uploadProfileAvatar = asyncHandler(async (req, res) => {
	const file = req.body.avatar;

	if (!file) {
		res.status(400);
		throw new Error('Unable to upload! No file found for upload');
	}

	// Uploading file to cloudnary
	const uploadedAvatarUrl = await imageUploader(file, 'avatars', 128);

	// Saving uploaded image URL as avatar
	req.user.avatar = uploadedAvatarUrl;
	const user = await req.user.save();
	res.json({ avatar_url: user.avatar });
});

export {
	getUserProfile,
	updateUserProfile,
	getUserShippingDetails,
	updateUserShippingDetails,
	getProfileAvatar,
	uploadProfileAvatar,
};

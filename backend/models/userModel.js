import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import tokenGenerator from '../utils/tokenGenerator.js';

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			default: null,
		},
		isActive: {
			type: Boolean,
			required: true,
			default: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		shippingAddress: {
			address: { type: String, default: '' },
			city: { type: String, default: '' },
			postalCode: { type: String, default: '' },
			country: { type: String, default: '' },
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

// Generate auth token for user
userSchema.methods.generateAuthToken = async function () {
	const user = this;
	// Generate token
	const token = tokenGenerator(user._id.toString());
	// Append token to user object
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

// Hide password, token and shippingAddress from client
userSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;
	delete userObject.shippingAddress;

	return userObject;
};

// Compare user password
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Check to see if user is active
userSchema.methods.isUserActive = function () {
	const user = this;
	return user.isActive;
};

// Encrypt password
userSchema.pre('save', async function (next) {
	// Checking if password field is modified
	if (!this.isModified('password')) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;

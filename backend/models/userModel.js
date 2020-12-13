import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
			address: { type: String },
			city: { type: String },
			postalCode: { type: String },
			country: { type: String },
		},
	},
	{
		timestamps: true,
	}
);

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

import mongoose from 'mongoose';
import Product from './productModel.js';

const categorySchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{
		timestamps: true,
	}
);
// Delete product reviews when product is removed
categorySchema.pre('remove', async function (next) {
	const category = this;
	await Product.deleteMany({ category: category._id });
	next();
});
const Category = mongoose.model('Category', categorySchema);

export default Category;

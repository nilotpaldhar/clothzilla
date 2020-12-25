import * as Yup from 'yup';

export default Yup.object({
	name: Yup.string().required('Please enter product name'),
	description: Yup.string().required('Please enter product description'),
	listPrice: Yup.number('Price must be a number').required(
		'Please enter product price'
	),
	discount: Yup.number('Discount must be a number').required(
		'Please enter product discount or enter "0" for no discount'
	),
	stock: Yup.number('Stock must be a number').required(
		'Please enter product stock'
	),
	tax: Yup.number('Tax must be a number').required(
		'Please enter product tax percentage'
	),
	category: Yup.string().required('Please choose product category'),
	isPublished: Yup.boolean().required(),
});

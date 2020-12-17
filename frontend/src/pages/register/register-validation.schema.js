import * as Yup from 'yup';

export default Yup.object({
	name: Yup.string().required('Please enter your name'),
	email: Yup.string().email().required('Please enter your valid email address'),
	password: Yup.string()
		.required('Please enter your password')
		.min(8, 'Your password must have minimum 8 characters'),
	passwordConfirmation: Yup.string()
		.required('Please confirm your password')
		.when('password', {
			is: (val) => (val && val.length > 0 ? true : false),
			then: Yup.string().oneOf(
				[Yup.ref('password')],
				'Both passwords needs to be the same'
			),
		}),
});

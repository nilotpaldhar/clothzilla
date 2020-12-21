import * as Yup from 'yup';

export default Yup.object({
	currentPassword: Yup.string().required('Please enter your current password'),
	newPassword: Yup.string()
		.required('Please enter your new password')
		.min(8, 'Your new password must have minimum 8 characters'),
	passwordConfirmation: Yup.string()
		.required('Please confirm your password')
		.when('newPassword', {
			is: (val) => (val && val.length > 0 ? true : false),
			then: Yup.string().oneOf(
				[Yup.ref('newPassword')],
				'Both passwords needs to be the same'
			),
		}),
});

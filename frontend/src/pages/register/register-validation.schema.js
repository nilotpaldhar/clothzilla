import * as yup from 'yup';

export default yup.object({
	name: yup.string().required('Please enter your name'),
	email: yup.string().email().required('Please enter your valid email address'),
	password: yup.string().required('Please enter your password'),
});

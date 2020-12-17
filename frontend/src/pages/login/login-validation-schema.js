import * as Yup from 'yup';

export default Yup.object({
	email: Yup.string().email().required('Please enter your valid email address'),
	password: Yup.string().required('Please enter your password'),
});

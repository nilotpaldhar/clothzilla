import * as Yup from 'yup';

export default Yup.object({
	name: Yup.string().required('Please enter your name'),
	email: Yup.string().email().required('Please enter a valid email address'),
});

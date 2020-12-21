import * as Yup from 'yup';

export default Yup.object({
	address: Yup.string().required('Please enter your address'),
	city: Yup.string().required('Please enter your city'),
	postalCode: Yup.number().required('Please enter your postal code'),
	country: Yup.string().required('Please enter your country'),
});

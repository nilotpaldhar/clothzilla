import * as Yup from 'yup';

export default Yup.object({
	title: Yup.string().required('Please enter review title'),
	comment: Yup.string().required('Please enter review comment'),
});

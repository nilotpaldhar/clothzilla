import React from 'react';
import { FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { useField } from 'formik';

const FormikInput = ({ id, label, srOnly, type, ...otherProps }) => {
	const [field, meta] = useField(otherProps);
	return (
		<FormGroup controlId={id}>
			<FormLabel srOnly={srOnly}>{label}</FormLabel>
			<FormControl
				type={type}
				{...otherProps}
				{...field}
				isValid={meta.touched && !meta.error}
				isInvalid={meta.touched && meta.error}
			/>
			{meta.touched && meta.error ? (
				<FormControl.Feedback type='invalid'>{meta.error}</FormControl.Feedback>
			) : null}
		</FormGroup>
	);
};

export default FormikInput;

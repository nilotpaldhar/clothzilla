import React from 'react';
import { FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { useField } from 'formik';

const FormikSelectInput = ({
	id,
	label,
	srOnly,
	type,
	optionName,
	children,
	...otherProps
}) => {
	const [field, meta] = useField(otherProps);
	return (
		<FormGroup controlId={id}>
			<FormLabel srOnly={srOnly}>{label}</FormLabel>
			<FormControl
				as='select'
				{...otherProps}
				{...field}
				isValid={meta.touched && !meta.error}
				isInvalid={meta.touched && meta.error}>
				<option value=''>{optionName}</option>
				{children}
			</FormControl>
			{meta.touched && meta.error ? (
				<FormControl.Feedback type='invalid'>{meta.error}</FormControl.Feedback>
			) : null}
		</FormGroup>
	);
};

export default FormikSelectInput;

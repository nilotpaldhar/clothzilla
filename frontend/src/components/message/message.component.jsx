import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ heading, variant = 'info', children }) => {
	return (
		<Alert variant={variant}>
			{heading && <Alert.Heading>{heading}</Alert.Heading>}{' '}
			{<p className='mb-0'>{children}</p>}
		</Alert>
	);
};

export default Message;

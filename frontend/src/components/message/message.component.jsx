import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ heading, variant = 'info', inline, children }) => {
	return (
		<Alert
			variant={variant}
			style={{ display: `${inline ? 'inline-block' : 'block'}` }}>
			{heading && <Alert.Heading>{heading}</Alert.Heading>}
			{<p className='mb-0'>{children}</p>}
		</Alert>
	);
};

export default Message;

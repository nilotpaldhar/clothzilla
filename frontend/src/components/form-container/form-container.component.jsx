import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import { ReactComponent as LogoDark } from '../../assets/logo/logo-dark.svg';
import styles from './form-container.module.scss';

const FormContainer = ({ children, title }) => {
	return (
		<Container>
			<Row className='justify-content-center'>
				<Col xs={12} md={8} lg={6}>
					<div className={styles.formContainer}>
						<div className={styles.header}>
							<Link to='/'>
								<LogoDark />
							</Link>
							<span>{title}</span>
						</div>
						<div className={styles.body}>{children}</div>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default FormContainer;

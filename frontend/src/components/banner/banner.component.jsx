import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import bgImg from '../../assets/images/banner.jpg';
import styles from './banner.module.scss';

const Banner = () => {
	return (
		<div className={styles.banner} style={{ backgroundImage: `url(${bgImg})` }}>
			<div className={styles.overlay}></div>
			<div className={styles.content}>
				<Container>
					<Row>
						<Col xs='12' md='8'>
							<h1>A fresh approach to shopping</h1>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien
								euismod maecenas nisl vitae neque volutpat adipiscing faucibus
								at sociis mauris viverra elementum rutrum.
							</p>
							<Button variant='primary'>Shop Now</Button>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	);
};

export default Banner;

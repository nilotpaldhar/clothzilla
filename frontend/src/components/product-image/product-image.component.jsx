import React from 'react';
import { Card } from 'react-bootstrap';

import styles from './product-image.module.scss';

const ProductImage = ({ src }) => {
	return (
		<Card className={styles.img}>
			<Card.Header>
				<span>Image</span>
				<button>Edit</button>
			</Card.Header>
			<Card.Img variant='bottom' src={src} />
		</Card>
	);
};

export default ProductImage;

import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import Product from '../product/product.component';

const ProductCollection = ({ products }) => {
	return (
		<Row>
			{products.map((product) => (
				<Col key={product.id} xs={12} sm={6} lg={4}>
					<Product product={product} />
				</Col>
			))}

			<Col xs={12} className='d-flex justify-content-center'>
				<Button
					variant='dark'
					className='px-4 px-lg-5 py-2 py-lg-3 text-capitalize'>
					Load More
				</Button>
			</Col>
		</Row>
	);
};

export default ProductCollection;

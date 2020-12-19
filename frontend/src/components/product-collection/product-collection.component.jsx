import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Button } from 'react-bootstrap';

import Product from '../product/product.component';

import { loadMoreProducts } from '../../redux/product-list/product-list.actions';
import {
	selectLoadMore,
	selectTotalPage,
	selectCurrentPage,
} from '../../redux/product-list/product-list.selectors';
import { selectActiveCategory } from '../../redux/category-list/category-list.selectors';

const ProductCollection = ({
	products,
	loadMoreProducts,
	loading,
	totalPages,
	currentPage,
	activeCategory,
}) => {
	return (
		<Row>
			{products.map((product) => (
				<Col key={product._id} xs={12} sm={6} lg={4}>
					<Product product={product} />
				</Col>
			))}

			<Col xs={12} className='d-flex justify-content-center'>
				{totalPages !== currentPage && (
					<Button
						variant='dark'
						className='px-4 px-lg-5 py-2 py-lg-3 text-capitalize'
						onClick={() => loadMoreProducts(currentPage + 1, activeCategory)}
						disabled={loading}>
						{loading ? 'Loading...' : 'Load More'}
					</Button>
				)}
			</Col>
		</Row>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: selectLoadMore,
	totalPages: selectTotalPage,
	currentPage: selectCurrentPage,
	activeCategory: selectActiveCategory,
});

const mapDispatchToProps = (dispatch) => ({
	loadMoreProducts: (page, category) =>
		dispatch(loadMoreProducts(page, category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCollection);

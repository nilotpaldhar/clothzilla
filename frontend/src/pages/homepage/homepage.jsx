import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Layout from '../../components/layout/layout.component';
import Message from '../../components/message/message.component';
import ProductFilter from '../../components/product-filter/product-filter.component';
import ProductCollection from '../../components/product-collection/product-collection.component';
import Spinner from '../../components/spinner/spinner.component';

import { fetchProductList } from '../../redux/product-list/product-list.actions';
import {
	selectLoading,
	selectError,
	selectProducts,
} from '../../redux/product-list/product-list.selectors';
import { selectActiveCategory } from '../../redux/category-list/category-list.selectors';

const Homepage = ({
	fetchProducts,
	loading,
	error,
	products,
	activeCategory,
}) => {
	useEffect(() => {
		fetchProducts(activeCategory);
	}, [fetchProducts, activeCategory]);

	return (
		<Layout withBanner stickyNav>
			<div id='shop' className='py-5'>
				<ProductFilter initialTitle='Latest Products' />
				{loading ? (
					<Spinner />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<ProductCollection products={products} />
				)}
			</div>
		</Layout>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: selectLoading,
	products: selectProducts,
	activeCategory: selectActiveCategory,
	error: selectError,
});

const mapDispatchToProps = (dispatch) => ({
	fetchProducts: (category) => dispatch(fetchProductList(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);

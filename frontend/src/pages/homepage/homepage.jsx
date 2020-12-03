import React from 'react';

import Layout from '../../components/layout/layout.component';
import ProductFilter from '../../components/product-filter/product-filter.component';
import ProductCollection from '../../components/product-collection/product-collection.component';

import styles from './homepage.module.scss';
import categories from '../../sample-data/categories';
import products from '../../sample-data/products';

const Homepage = () => {
	return (
		<Layout withBanner stickyNav>
			<ProductFilter initialTitle='Latest Products' categories={categories} />
			<ProductCollection products={products} />
		</Layout>
	);
};

export default Homepage;

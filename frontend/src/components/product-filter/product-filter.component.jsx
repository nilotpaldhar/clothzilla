import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import ProductFilterItem from '../product-filter-item/product-filter-item.component';
import styles from './product-filter.module.scss';

const ProductFilter = ({ initialTitle, categories }) => {
	const [activeCategory, setActiveCategory] = useState('*');
	const [title, setTitle] = useState(initialTitle);

	const toggleCategory = (_evt) => {
		setActiveCategory(_evt.target.value);
		if (_evt.target.value !== '*') {
			setTitle(`${_evt.target.innerText} collection`);
		} else {
			setTitle(initialTitle);
		}
	};

	return (
		<div className={styles.filterContainer}>
			<Row>
				<Col xs={12} lg={5}>
					<h2>{title}</h2>
				</Col>
				<Col
					xs={12}
					lg={7}
					className='d-flex justify-content-start justify-content-lg-end'>
					<ul>
						<ProductFilterItem
							id='*'
							name='all'
							isActive={activeCategory === '*'}
							handleClick={toggleCategory}
						/>
						{categories.map((category) => (
							<ProductFilterItem
								key={category.id}
								id={category.id}
								name={category.name}
								isActive={parseInt(activeCategory) === category.id}
								handleClick={toggleCategory}
							/>
						))}
					</ul>
				</Col>
			</Row>
		</div>
	);
};

ProductFilter.defaultProps = {
	initialTitle: 'product collection',
};

ProductFilter.prototype = {
	initialTitle: PropTypes.string,
	categories: PropTypes.array,
};

export default ProductFilter;

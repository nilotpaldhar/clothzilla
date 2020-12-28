import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col } from 'react-bootstrap';

import ProductFilterItem from '../product-filter-item/product-filter-item.component';
import styles from './product-filter.module.scss';

import {
	fetchCategories,
	setActiveCategory,
} from '../../redux/category-list/category-list.actions';
import {
	selectCategories,
	selectActiveCategory,
	selectActiveCategoryTitle,
} from '../../redux/category-list/category-list.selectors';

const ProductFilter = ({
	initialTitle = 'product collection',
	fetchCategories,
	categories,
	activeCategory,
	title,
	setActiveCategory,
}) => {
	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	const toggleCategory = (_evt) => {
		if (_evt.target.value !== '*') {
			setActiveCategory({
				id: _evt.target.value,
				title: `${_evt.target.innerText} collection`,
			});
		} else {
			setActiveCategory({
				id: _evt.target.value,
				title: initialTitle,
			});
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
						{categories &&
							categories.map((category) => (
								<ProductFilterItem
									key={category._id}
									id={category._id}
									name={category.name}
									isActive={activeCategory === category._id}
									handleClick={toggleCategory}
								/>
							))}
					</ul>
				</Col>
			</Row>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	categories: selectCategories,
	activeCategory: selectActiveCategory,
	title: selectActiveCategoryTitle,
});

const mapDispatchToProps = (dispatch) => ({
	fetchCategories: () => dispatch(fetchCategories()),
	setActiveCategory: (categoryId) => dispatch(setActiveCategory(categoryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductFilter);

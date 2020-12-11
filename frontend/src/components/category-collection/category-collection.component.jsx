import React, { useState } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowRight,
	faPen,
	faTrash,
	faPlus,
} from '@fortawesome/free-solid-svg-icons';

import styles from './category-collection.module.scss';

import categories from '../../sample-data/categories';

const CategoryCollection = () => {
	const [categoryLimit, setCategoryLimit] = useState(2);

	return (
		<Card className={styles.list}>
			<Card.Header>
				<span>Categories</span>
				<Button variant='dark' size='sm'>
					<FontAwesomeIcon icon={faPlus} /> New
				</Button>
			</Card.Header>
			<ListGroup variant='flush'>
				{categories
					.filter((category, idx) => idx < categoryLimit)
					.map((category) => (
						<ListGroup.Item
							key={category.id}
							className='d-flex justify-content-between align-items-center'>
							<div className={styles.name}>{category.name}</div>
							<div>
								<Button variant='light' size='sm' className='mr-1'>
									<FontAwesomeIcon icon={faPen} />
								</Button>
								<Button variant='danger' size='sm'>
									<FontAwesomeIcon icon={faTrash} />
								</Button>
							</div>
						</ListGroup.Item>
					))}
				{categories.length > categoryLimit && (
					<ListGroup.Item>
						<button
							onClick={() => setCategoryLimit(categoryLimit + 3)}
							className={styles.load}>
							<span>Load More</span>
							<FontAwesomeIcon icon={faArrowRight} />
						</button>
					</ListGroup.Item>
				)}
			</ListGroup>
		</Card>
	);
};

export default CategoryCollection;

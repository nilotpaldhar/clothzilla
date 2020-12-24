import React from 'react';
import { Link } from 'react-router-dom';
import styles from './search-result.module.scss';

const SearchResult = ({ result }) => {
	return (
		<Link
			to={`/product/${result.slug}/${result._id}`}
			className={styles.searchResult}>
			<img src={result.image} alt={result.name} />

			<div>
				<h1>{result.name}</h1>
				<div className={styles.meta}>
					<span>${result.salePrice}</span>
					<span className='text-success'>{result.discount}% Off</span>
				</div>
			</div>
		</Link>
	);
};

export default SearchResult;

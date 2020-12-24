import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Autosuggest from 'react-autosuggest';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';

import SearchResult from '../search-result/search-result.component';
import styles from './searchbar.module.scss';

import {
	setSearchQuery,
	clearSearchQuery,
	clearSearchResult,
	searchAsync,
	hideSearchbar,
} from '../../redux/search/search.actions';
import {
	selectSearchQuery,
	selectSearchResult,
} from '../../redux/search/search.selectors';

const Searchbar = ({
	searchAsync,
	setQuery,
	clearQuery,
	clearSearchResult,
	query,
	searchResult,
	hideSearchbar,
}) => {
	const history = useHistory();

	// Handle input close
	const handleClick = () => {
		clearQuery();
		clearSearchResult();
		hideSearchbar();
	};

	// Handles input change
	const handleChange = (_evt, { newValue }) => {
		setQuery(newValue);
	};

	// Autosuggest will pass through all these props to the input.
	const inputProps = {
		placeholder: 'Search for products',
		value: query,
		onChange: handleChange,
	};

	// Populate search results
	const onSuggestionsFetchRequested = ({ value }) => {
		if (!value) {
			clearSearchResult();
		}
		searchAsync(value);
	};

	// Parse suggestion value from the result
	const getSuggestionValue = (result) => result.name;

	// Renders suggestions on the page
	const renderSuggestion = (result) => <SearchResult result={result} />;

	// Handles suggestion selected
	const handleSuggestionSelected = (_evt, { suggestion, method }) => {
		if (method.toLowerCase() === 'enter') {
			history.push(`/product/${suggestion.slug}/${suggestion._id}`);
			clearQuery();
		}
	};

	return (
		<div className={styles.search}>
			<FontAwesomeIcon icon={faSearch} className={styles.icon} />
			<Autosuggest
				suggestions={searchResult}
				inputProps={inputProps}
				onSuggestionsFetchRequested={onSuggestionsFetchRequested}
				onSuggestionsClearRequested={() => clearSearchResult()}
				getSuggestionValue={getSuggestionValue}
				renderSuggestion={renderSuggestion}
				onSuggestionSelected={handleSuggestionSelected}
			/>
			<button type='button' onClick={handleClick}>
				<FontAwesomeIcon icon={faTimes} />
			</button>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	query: selectSearchQuery,
	searchResult: selectSearchResult,
});

const mapDispatchToProps = (dispatch) => ({
	setQuery: (query) => dispatch(setSearchQuery(query)),
	clearQuery: () => dispatch(clearSearchQuery()),
	clearSearchResult: () => dispatch(clearSearchResult()),
	searchAsync: (query) => dispatch(searchAsync(query)),
	hideSearchbar: () => dispatch(hideSearchbar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);

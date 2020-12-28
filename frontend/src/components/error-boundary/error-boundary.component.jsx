import React, { Component } from 'react';
import styles from './error-boundary.module.scss';

export class ErrorBoundary extends Component {
	constructor() {
		super();
		this.state = {
			hasErrored: false,
		};
	}

	static getDerivedStateFromError(error) {
		// Process error
		return { hasErrored: true };
	}

	componentDidCatch(error, info) {
		console.log(error);
	}

	render() {
		const { hasErrored } = this.state;
		const { children } = this.props;

		if (hasErrored) {
			return (
				<div className={styles.errorBoundary}>
					<h1>This page is broken</h1>
					<p>Sorry for inconvenience, we will fix it soon</p>
				</div>
			);
		}

		return children;
	}
}

export default ErrorBoundary;

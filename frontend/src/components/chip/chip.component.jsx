import React from 'react';
import { Badge } from 'react-bootstrap';

import styles from './chip.module.scss';

const Chip = ({ variant, children }) => {
	return (
		<div className={styles.chip}>
			<Badge variant={variant}>{children}</Badge>
		</div>
	);
};

Chip.defaultProps = {
	variant: 'primary',
};

export default Chip;

import React from 'react';
import { ModalWrapper, Reoverlay } from 'reoverlay';

import 'reoverlay/lib/ModalWrapper.css';
import styles from './confirm-modal.module.scss';

const ConfirmModal = ({ text, onConfirm }) => {
	const closeModal = () => {
		Reoverlay.hideModal();
	};

	return (
		<ModalWrapper contentContainerClassName={styles.body} animation='zoom'>
			<div className={styles.textContent}>
				<h4>Confirm</h4>
				<p>{text}</p>
			</div>
			<div className={styles.btnContainer}>
				<button onClick={onConfirm}>Yes</button>
				<button onClick={closeModal}>No</button>
			</div>
		</ModalWrapper>
	);
};

export default ConfirmModal;

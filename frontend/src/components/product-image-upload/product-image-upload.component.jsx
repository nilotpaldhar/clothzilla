import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ProgressBar } from 'react-bootstrap';
import cx from 'classnames';

import toBase64 from '../../utils/toBase64';
import { adminProductUpload } from '../../redux/admin-product/admin-product.actions';
import { selectProductImageUploading } from '../../redux/admin-product/admin-product.selectors';

import styles from './product-image-upload.module.scss';

const ProductImageUpload = ({ id, uploadImage, uploading }) => {
	const onDrop = useCallback(
		async (acceptedFiles) => {
			const productImg = acceptedFiles[0];
			const base64EncodedImage = await toBase64(productImg);
			uploadImage(id, { image: base64EncodedImage });
		},
		[id, uploadImage]
	);

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		onDrop,
		maxFiles: 1,
		accept: 'image/*',
	});

	return (
		<>
			<div
				{...getRootProps({
					className: cx(styles.dropzone, {
						[styles.isDragActive]: isDragActive,
						[styles.isDragAccept]: isDragAccept,
						[styles.isDragReject]: isDragReject,
					}),
				})}>
				<input {...getInputProps()} />
				{isDragActive ? (
					<p>Drop the image here ...</p>
				) : (
					<p>Choose product image</p>
				)}
			</div>
			{uploading && (
				<ProgressBar animated variant='success' label='Uploading' now={100} />
			)}
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	uploading: selectProductImageUploading,
});

const mapDispatchToProps = (dispatch) => ({
	uploadImage: (id, image) => dispatch(adminProductUpload(id, image)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductImageUpload);

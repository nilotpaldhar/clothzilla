import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Card, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { Reoverlay } from 'reoverlay';

import Layout from '../../components/layout/layout.component';
import CategoryForm from '../../components/category-form/category-form.component';
import Spinner from '../../components/spinner/spinner.component';
import Message from '../../components/message/message.component';
import ConfirmModal from '../../components/confirm-modal/confirm-modal.component';

import {
	fetchCategories,
	editCategory,
	deleteCategory,
} from '../../redux/category-list/category-list.actions';
import {
	selectLoading,
	selectError,
	selectCategories,
} from '../../redux/category-list/category-list.selectors';

const AdminCategories = ({
	fetchCategories,
	editCategory,
	deleteCategory,
	loading,
	error,
	categories,
}) => {
	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	// Delete a category by ID
	const handleDelete = (id) => {
		Reoverlay.showModal(ConfirmModal, {
			text:
				'If you delete this category, the associate products will also be deleted?',
			onConfirm: async () => {
				await deleteCategory(id);
				Reoverlay.hideModal();
			},
		});
	};

	return (
		<Layout>
			<Card>
				<Card.Header as='h1'>List of Categories</Card.Header>
				<Card.Body>
					<CategoryForm />

					{loading ? (
						<Spinner />
					) : error ? (
						<Message variant='danger'>{error}</Message>
					) : (
						<Table responsive hover>
							<thead>
								<tr>
									<th>CREATED AT</th>
									<th className='text-center'>NAME</th>
									<th className='text-center'>EDIT</th>
									<th className='text-center'>DELETE</th>
								</tr>
							</thead>
							<tbody>
								{categories.map((category) => (
									<tr key={category._id}>
										<td>
											{format(new Date(category.createdAt), 'MMM, dd yyyy')}
										</td>
										<td className='text-uppercase text-center'>
											{category.name}
										</td>
										<td className='text-center'>
											<button
												type='button'
												className='btn btn-light btn-sm'
												onClick={() => editCategory(category)}>
												<FontAwesomeIcon icon={faPen} />
											</button>
										</td>
										<td className='text-center'>
											<button
												type='button'
												className='btn btn-danger btn-sm'
												onClick={() => handleDelete(category._id)}>
												<FontAwesomeIcon icon={faTrash} />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					)}
				</Card.Body>
			</Card>
		</Layout>
	);
};

const mapStateToProps = createStructuredSelector({
	loading: selectLoading,
	error: selectError,
	categories: selectCategories,
});

const mapDispatchToProps = (dispatch) => ({
	fetchCategories: () => dispatch(fetchCategories()),
	editCategory: (category) => dispatch(editCategory(category)),
	deleteCategory: (id) => dispatch(deleteCategory(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategories);

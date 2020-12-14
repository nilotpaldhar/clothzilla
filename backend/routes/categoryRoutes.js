import express from 'express';
import {
	getAllCategories,
	getCategoryById,
	createCategory,
	updateCategory,
	deleteCategory,
} from '../controllers/categoryController.js';
import { auth, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getAllCategories).post(auth, admin, createCategory);
router
	.route('/:id')
	.get(getCategoryById)
	.put(auth, admin, updateCategory)
	.delete(auth, admin, deleteCategory);

export default router;

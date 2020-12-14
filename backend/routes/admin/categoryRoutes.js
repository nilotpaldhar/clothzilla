import express from 'express';
import {
	createCategory,
	updateCategory,
	deleteCategory,
} from '../../controllers/admin/categoryController.js';
import { auth, admin } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', auth, admin, createCategory);
router
	.route('/:id')
	.put(auth, admin, updateCategory)
	.delete(auth, admin, deleteCategory);

export default router;

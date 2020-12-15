import express from 'express';
import {
	getAllProducts,
	createProduct,
	getProductById,
	updateProduct,
	deleteProduct,
} from '../../controllers/admin/productController.js';
import { auth, admin } from '../../middleware/authMiddleware.js';
const router = express.Router();

router
	.route('/')
	.get(auth, admin, getAllProducts)
	.post(auth, admin, createProduct);
router
	.route('/:id')
	.get(auth, admin, getProductById)
	.put(auth, admin, updateProduct)
	.delete(auth, admin, deleteProduct);

export default router;

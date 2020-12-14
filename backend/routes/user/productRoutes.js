import express from 'express';
import {
	getAllActiveProducts,
	getActiveProductsById,
	getRelatedProducts,
} from '../../controllers/user/productController.js';
const router = express.Router();

router.get('/', getAllActiveProducts);
router.get('/:slug/:id', getActiveProductsById);
router.get('/:slug/:id/related', getRelatedProducts);

export default router;

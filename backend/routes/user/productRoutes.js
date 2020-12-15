import express from 'express';
import {
	getAllActiveProducts,
	searchProducts,
	getActiveProductById,
	getRelatedProducts,
} from '../../controllers/user/productController.js';
const router = express.Router();

router.get('/', getAllActiveProducts);
router.get('/search', searchProducts);
router.get('/:slug/:id', getActiveProductById);
router.get('/:slug/:id/related', getRelatedProducts);

export default router;

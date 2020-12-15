import express from 'express';
import {
	getAllActiveProducts,
	getActiveProductById,
	getRelatedProducts,
} from '../../controllers/user/productController.js';
const router = express.Router();

router.get('/', getAllActiveProducts);
router.get('/:slug/:id', getActiveProductById);
router.get('/:slug/:id/related', getRelatedProducts);

export default router;

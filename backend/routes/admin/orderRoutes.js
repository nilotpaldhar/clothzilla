import express from 'express';
import {
	getAllOrders,
	getOrderById,
	deliverOrder,
	deleteOrder,
} from '../../controllers/admin/orderController.js';
import { auth, admin } from '../../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', auth, admin, getAllOrders);
router.post('/:id/deliver', auth, admin, deliverOrder);
router
	.route('/:id')
	.get(auth, admin, getOrderById)
	.delete(auth, admin, deleteOrder);

export default router;

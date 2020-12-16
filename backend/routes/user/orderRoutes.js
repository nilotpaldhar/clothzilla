import express from 'express';
import {
	getAllOrders,
	getOrderById,
	createOrder,
	payOrder,
	cancelOrder,
} from '../../controllers/user/orderController.js';
import { auth } from '../../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(auth, getAllOrders).post(auth, createOrder);
router.get('/:id', auth, getOrderById);
router.put('/:id/pay', auth, payOrder);
router.put('/:id/cancel', auth, cancelOrder);

export default router;

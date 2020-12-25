import asyncHandler from 'express-async-handler';
import Order from '../../models/orderModel.js';

// @desc Get all orders
// @route GET /api/admin/orders
// @access PRIVATE/ADMIN
const getAllOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({})
		.select('-shippingAddress -orderItems')
		.sort({
			createdAt: -1,
		})
		.populate('user', 'name');

	res.json(orders);
});

// @desc Get single order by ID
// @route GET /api/admin/orders/:id
// @access PRIVATE/ADMIN
const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findOne({ _id: req.params.id }).populate(
		'user',
		'name email'
	);

	if (!order) {
		res.status(404);
		throw new Error('Order not found');
	}

	res.json(order);
});

// @desc Mark order as delivered
// @route PUT /api/admin/orders/:id/deliver
// @access PRIVATE/ADMIN
const deliverOrder = asyncHandler(async (req, res) => {
	const order = await Order.findOne({ _id: req.params.id });

	if (!order) {
		res.status(404);
		throw new Error('Order not found');
	}

	if (!order.isPaid) {
		res.status(400);
		throw new Error(
			'Unable to deliver product. Please check order is paid or not'
		);
	}

	if (order.isDelivered) {
		res.status(400);
		throw new Error('Order is already delivered');
	}

	order.isDelivered = true;
	order.status = 'delivered';
	order.deliveredAt = Date.now();
	await order.save();

	res.json({ message: 'Order delivered successfully' });
});

// @desc Delete order by ID
// @route DELETE /api/admin/orders/:id
// @access PRIVATE/ADMIN
const deleteOrder = asyncHandler(async (req, res) => {
	const order = await Order.findOne({ _id: req.params.id });
	if (!order) {
		res.status(404);
		throw new Error('Order not found');
	}

	if (order.isPaid && !order.isDelivered && !order.isCanceled) {
		res.status(400);
		throw new Error('Unable to delete order! The order is not delivered yet');
	}

	await order.remove();
	res.json({ message: 'Order deleted successfully' });
});

export { getAllOrders, getOrderById, deliverOrder, deleteOrder };

import asyncHandler from 'express-async-handler';
import Order from '../../models/orderModel.js';

// @desc Get all orders of logged in user
// @route GET /api/myorders
// @access PRIVATE
const getAllOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id })
		.select('-shippingAddress -orderItems')
		.sort({
			createdAt: -1,
		});
	res.json(orders);
});

// @desc Get order by ID of logged in user
// @route GET /api/myorders/:id
// @access PRIVATE
const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findOne({
		_id: req.params.id,
		user: req.user._id,
	}).populate('user', 'name email');
	if (!order) {
		res.status(404);
		throw new Error('Order not found');
	}
	res.json(order);
});

// @desc Create a new order
// @route POST /api/myorders
// @access PRIVATE
const createOrder = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		shippingPrice,
		itemsPrice,
		totalPrice,
		taxPrice,
	} = req.body;

	// Checking if order items exists or not
	if (!orderItems || orderItems.length === 0) {
		res.status(400);
		throw new Error('Unable to place order! Shopping cart is empty');
	}

	const order = new Order({
		user: req.user._id,
		shippingAddress,
		paymentMethod,
		orderItems,
		shippingPrice,
		itemsPrice,
		taxPrice,
		totalPrice,
	});
	const createdOrder = await order.save();
	res.json(createdOrder);
});

// @desc Mark order as paid
// @route POST /api/myorders/:id/pay
// @access PRIVATE
const payOrder = asyncHandler(async (req, res) => {
	res.json({ message: 'Order paid' });
});

// @desc Mark order as cancelled
// @route POST /api/myorders/:id/cancel
// @access PRIVATE
const cancelOrder = asyncHandler(async (req, res) => {
	const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
	if (!order) {
		res.status(404);
		throw new Error('Order not found');
	}

	if (order.isCanceled) {
		res.status(400);
		throw new Error('Order already canceled');
	}

	order.isCanceled = true;
	order.status = 'canceled';
	await order.save();

	res.json({ message: 'Order canceled successfully' });
});

export { getAllOrders, getOrderById, createOrder, payOrder, cancelOrder };

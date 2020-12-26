import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import Order from '../../models/orderModel.js';
import Product from '../../models/productModel.js';
import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

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
	// Checking if valid id
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400);
		throw new Error('Please check your order ID');
	}

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
	const canceledOrder = await order.save();

	res.json(canceledOrder);
});

// @desc Mark order as paid
// @route POST /api/myorders/:id/pay
// @access PRIVATE
const payOrder = asyncHandler(async (req, res) => {
	let paymentResult = null;

	// Checking if valid id
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		res.status(400);
		throw new Error('Please check your order ID');
	}

	// Checking if order exists
	const order = await Order.findById(req.params.id);

	if (!order) {
		res.status(404);
		throw new Error('Order not found');
	}

	// Checking if order is paid or not
	if (order.isPaid) {
		res.status(400);
		throw new Error('Order is already paid');
	}

	// Checking if valid payment method
	const payMethod = req.query.method || '';
	const availablePayMethods = ['paypal', 'stripe'];

	if (!payMethod || !availablePayMethods.includes(payMethod)) {
		res.status(400);
		throw new Error('The payment method is not available');
	}

	if (payMethod === 'stripe') {
		paymentResult = await stripePaymentHandler(req, res, order);
	}

	if (payMethod === 'paypal') {
		paymentResult = await paypalPaymentHandler(req, res, order);
	}

	// Updating order
	order.isPaid = true;
	order.paidAt = Date.now();
	order.status = 'processing';
	order.paymentResult = paymentResult;
	const updatedOrder = await order.save();

	// Updating product buyer list
	updatedOrder.orderItems.forEach(async (orderItem) => {
		const product = await Product.findById(orderItem.product);
		if (!product.buyerList.includes(updatedOrder.user)) {
			product.buyerList.push(updatedOrder.user);
		}
		await product.save();
	});

	res.json(updatedOrder);
});

// @desc Handles stripe payment
const stripePaymentHandler = async (req, res, order) => {
	try {
		// Creating new customer
		const customer = await stripe.customers.create({
			name: order.shippingAddress.name,
			address: {
				line1: order.shippingAddress.address,
				postal_code: order.shippingAddress.postalCode,
				city: order.shippingAddress.city,
				country: order.shippingAddress.country,
			},
		});

		// Creating card
		const card = await stripe.customers.createSource(customer.id, {
			source: req.body.token.id,
		});

		// // Make payment
		const { id, billing_details } = await stripe.charges.create({
			source: card.id,
			customer: customer.id,
			amount: req.body.amount,
			currency: 'usd',
			description: 'Test transaction for a personal project',
		});

		return {
			id,
			status: null,
			update_time: Date.now(),
			email_address: billing_details.name,
		};
	} catch (error) {
		throw new Error('Payment failed. Please try again later');
	}
};

// @desc Handles paypal payment
const paypalPaymentHandler = async (req, res, order) => {
	const { id, status, update_time, payer } = req.body;
	return { id, status, update_time, email_address: payer.email_address };
};

export { getAllOrders, getOrderById, createOrder, payOrder, cancelOrder };

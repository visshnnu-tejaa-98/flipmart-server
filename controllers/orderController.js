const Order = require('../models/orderModel');

// desc create an order
// @route POST /api/orders
// @access private
const createOrder = async (req, res) => {
	try {
		const data = ({
			price,
			shippingPrice,
			taxPrice,
			totalPrice,
			orderItems,
			paymentMethod,
			shippingAddress,
			user,
		} = req.body);
		console.log(data);
		if (orderItems && orderItems.length === 0) {
			res.statuse(400).json({ message: ' No Order Items' });
		} else {
			const order = await Order.create(data);
			res.status(201).json(order);
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: 'Something went wrong' });
	}
};

module.exports = { createOrder };

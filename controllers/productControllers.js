const Product = require('../models/productModel');

// desc fetch all products
// @route GET /api/products
// @access public
const getProducts = async (req, res) => {
	try {
		let products = await Product.find();
		res.status(200).json(products);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: 'Something went wrong' });
	}
};

// desc fetch single products
// @route GET /api/products/:id
// @access public
const getProduct = async (req, res) => {
	try {
		let product = await Product.findById(req.params.id);
		res.status(200).json(product);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: 'Something went wrong' });
	}
};
module.exports = { getProducts, getProduct };

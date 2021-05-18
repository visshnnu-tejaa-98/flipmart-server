const Product = require('../models/productModel');

const getProducts = async (req, res) => {
	try {
		let products = await Product.find();
		res.status(200).json(products);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: 'Something went wrong' });
	}
};

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

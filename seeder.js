const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const connectDB = require('./config/db');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const productsList = require('./data/products');

dotenv.config();

connectDB();

const importData = async () => {
	try {
		await User.deleteMany();
		await Product.deleteMany();
		await Order.deleteMany();
		console.log(User);
		let createUsers = await User.insertMany(users);
		let adminUser = createUsers[0]._id;
		let sampleProducts = productsList.map((product) => {
			return { ...product, user: adminUser };
		});
		await Product.insertMany(sampleProducts);
		console.log('Data Imported');
		process.exit();
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await User.deleteMany();
		await Product.deleteMany();
		await Order.deleteMany();
		console.log('Data destroyed');
		process.exit();
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}

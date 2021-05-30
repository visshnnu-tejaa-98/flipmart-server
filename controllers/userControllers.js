const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { generateToken } = require('../utils/auth');
const { generateHash } = require('../utils/encrypt');
const {
	addEmail,
	addSubject,
	addHTML,
	sendMailToUser,
	sendResetPassword,
} = require('../utils/mail');

// desc Register USer
// @route POST /api/users/register
// @access public
const registerUser = async (req, res) => {
	try {
		let user = await User.find({ email: req.body.email });
		if (user.length > 0) {
			res.json({ message: 'User already exists!' });
		} else {
			const hash = await generateHash(req.body.password);
			req.body.password = hash;
			const newUser = {
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				conformPassword: req.body.conformPassword,
				isAdmin: false,
			};
			await User.create(newUser);
			addEmail(newUser.email, process.env.EMAIL);
			addSubject('Registration Sucessful!!!');
			addHTML(newUser.name, process.env.FRONTEND);
			sendMailToUser();
			res.status(200).json({ message: 'User Registered' });
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: 'Something went wrong' });
	}
};

// desc login user
// @route POST /api/users/login
// @access public
const loginUser = async (req, res) => {
	try {
		let match = await User.find({ email: req.body.email });
		let user = match[0];
		if (user) {
			let result = await bcrypt.compare(req.body.password, user.password);

			if (result) {
				let token = await generateToken(user.id);

				res.status(200).json({ name: user.name, email: user.email, isAdmin: false, token });
			} else {
				res.status(401).json({ message: 'Incorret Password' });
			}
		} else {
			res.status(400).json({ message: 'Invalid Email Entered' });
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: 'Something went wrong' });
		res.status(400);
	}
};

// desc get user profile
// @route GET /api/users/profile
// @access private
const getProfile = (req, res) => {
	res.send('welcome to flipmart app');
};

// desc get all users
// @route GET /api/users/
// @access private (accessale by only admin)
const getAllUsers = async (req, res) => {
	try {
		const user = await User.find();
		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: 'Something went wrong' });
	}
};

// desc update userName
// @route PUT /api/users/
// @access private
const editName = async (req, res) => {
	try {
		await User.updateOne({ email: req.body.email }, { $set: { name: req.body.name } });
		const user = await User.find({ email: req.body.email });
		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: 'Something went wrong' });
	}
};

// desc sent a mail to reset password
// @route POST /api/users/forgot
// @access public
const forgot = async (req, res) => {
	try {
		addEmail(req.body.email, process.env.EMAIL);
		addSubject('Reset Your Password!!!');
		let user = await User.find({ email: req.body.email });
		if (user) {
			sendResetPassword(user[0].name, process.env.FRONTEND + `/reset/${user[0]._id}`);
			sendMailToUser();
			res.status(200).json({ message: '😀 Mail Sent to the user, Check Your Email' });
		} else {
			res.status(400).json({ message: "😞 You doesn't have an account, Please Register" });
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: '😞 Something went wrong, Please try Again' });
	}
};

// desc sent a mail to reset password
// @route PUT /api/users/reset
// @access public
const reset = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.body.id });
		if (user) {
			let hash = await generateHash(req.body.password);
			req.body.password = hash;
			let aa = await User.updateOne({ _id: req.body.id }, { $set: { password: hash } });
			res.status(200).json({ message: 'Password Updated' });
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: '😞 Something went wrong, Please try Again' });
	}
};

module.exports = { registerUser, loginUser, getProfile, getAllUsers, editName, forgot, reset };

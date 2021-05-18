const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { generateToken } = require('../utils/auth');
const { generateHash } = require('../utils/encrypt');
const { addEmail, addSubject, addHTML, sendMailToUser } = require('../utils/mail');

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

const loginUser = async (req, res) => {
	try {
		let match = await User.find({ email: req.body.email });
		let user = match[0];

		console.log(user);
		if (user) {
			let result = await bcrypt.compare(req.body.password, user.password);
			if (result) {
				let token = await generateToken(user.id);
				console.log(token);
				res.status(200).json({ name: user.name, email: user.email, token });
			}
		} else {
			res.status(400).json({ message: 'Invalid Email Entered' });
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: 'Something went wrong' });
	}
};

module.exports = { registerUser, loginUser };

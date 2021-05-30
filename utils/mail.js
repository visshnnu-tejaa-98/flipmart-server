const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD,
	},
});

const mailOptions = {
	from: process.env.EMAIL,
};

const sendMailToUser = () => {
	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log(err);
			return false;
		} else {
			console.log('Email Sent');
			return true;
		}
	});
};

const addSubject = (sub) => {
	mailOptions.subject = sub;
};

const addEmail = (targetMail, bccMail) => {
	mailOptions.to = targetMail;
	mailOptions.bcc = bccMail;
};

const addHTML = (user, redirect) => {
	mailOptions.html = `<p>Hello ${user}</p>
<p>Thank you for Registering <strong>Flipmart</strong>, India's best online shopping application</p>
<p>Explore our app here: <a href=${redirect}>Click Here</a></p>`;
};

const sendResetPassword = (user, redirect) => {
	mailOptions.html = `<p>Hello ${user}</p>
<p>THere is Your link to reset Your Password : <a href=${redirect}>Click Here</a></p></p> `;
};
module.exports = {
	sendMailToUser,
	addSubject,
	addEmail,
	addHTML,
	mailOptions,
	transporter,
	sendResetPassword,
};

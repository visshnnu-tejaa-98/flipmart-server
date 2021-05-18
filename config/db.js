const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
		});
		console.log(`Mongodb Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};

module.exports = connectDB;

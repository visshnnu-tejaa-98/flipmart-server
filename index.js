// npm imports
const express = require('express');
const dotenv = require('dotenv');

// local imports
const connectDB = require('./config/db');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/usersRoutes');
const { Authenticate } = require('./utils/auth');

// configs
dotenv.config();
connectDB();

// local constants
const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());

app.use('/api/products', productRoutes);

app.use('/api/users', userRoutes);

app.use('/api/protect', Authenticate, (req, res) => {
	res.send('This is protected route');
});

app.get('/', (req, res) => {
	res.send('welcome to flipmart app');
});

// listner
app.listen(PORT, () => console.log(`:::server is up and running on port ${PORT}:::`));

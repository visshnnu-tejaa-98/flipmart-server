// npm imports
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// local imports
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/usersRoutes');
const OrderRoutes = require('./routes/orderRoutes');

// configs
dotenv.config();
connectDB();

// local constants
const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', OrderRoutes);

// listner
app.listen(PORT, () => console.log(`:::server is up and running on port ${PORT}:::`));

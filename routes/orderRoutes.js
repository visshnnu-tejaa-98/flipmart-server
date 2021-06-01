const express = require('express');
const Router = express.Router();
const { createOrder } = require('../controllers/orderController');
const Order = require('../models/orderModel');

Router.post('/', createOrder);

module.exports = Router;

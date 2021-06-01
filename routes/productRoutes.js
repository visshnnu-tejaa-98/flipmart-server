const express = require('express');
const { getProducts, getProduct } = require('../controllers/productControllers');
const Router = express.Router();
const Product = require('../models/productModel');

Router.get('/', getProducts);
Router.get('/:id', getProduct);

module.exports = Router;

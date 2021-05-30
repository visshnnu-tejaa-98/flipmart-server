const express = require('express');
const router = express.Router();
const {
	registerUser,
	loginUser,
	getProfile,
	getAllUsers,
	editName,
	forgot,
	reset,
} = require('../controllers/userControllers');
const { Authenticate } = require('../utils/auth');

router.post('/register', registerUser);
router.post('/forgot', forgot);
router.put('/reset', reset);
router.post('/login', loginUser);
router.get('/profile', getProfile);
router.get('/', getAllUsers);
router.put('/', [Authenticate], editName);
module.exports = router;

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Create a new order
router.post('/', authMiddleware, orderController.createOrder);

module.exports = router;
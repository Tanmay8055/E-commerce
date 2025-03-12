const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User'); // Import the User model

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { items, total } = req.body;

    // Assuming you have authentication middleware that adds the user to the request
    const userId = req.user._id; // Get user ID from the authenticated request

    if (!userId || !items || !total) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newOrder = new Order({
      userId,
      items,
      total,
    });

    await newOrder.save();

    res.status(201).json({
      message: 'Order created successfully',
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

module.exports = router;
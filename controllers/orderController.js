const Order = require('../models/Order');
const User = require('../models/User'); // You might use this
const logger = require('../Utils/logger');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;

    // Assuming you have authentication middleware that adds the user to the request
    const userId = req.user._id; // Get user ID from the authenticated request

    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const newOrder = new Order({
      userId: req.user._id,
      items,
      total,
    });

    await newOrder.save();

    return res.status(201).json({
      message: 'Order created successfully',
      orderId: newOrder._id,
    });
  } catch (error) {
    logger.error('Error creating order:', error);
    return res.status(500).json({ message: 'Error creating order' });
  }
};
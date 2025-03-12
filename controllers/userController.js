const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const logger = require('../Utils/logger');

// Registration
exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // Check if user with email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // Consistent Success Response (201 Created)
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Improved Error Logging and Consistent Error Response (500 Internal Server Error)
    logger.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expiration time
    });

    // Consistent Success Response (200 OK)
    return res.status(200).json({ token, userId: user._id });
  } catch (error) {
    // Improved Error Logging and Consistent Error Response (500 Internal Server Error)
    logger.error('Error logging in user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get User by ID
exports.getUserById = async (req, res) => {
  try {
    // Authentication middleware should be implemented here
    // Verify JWT token from headers

    const user = await User.findById(req.params.id).select('-password'); // Exclude password from response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Consistent Success Response (200 OK)
    return res.status(200).json(user);
  } catch (error) {
    // Improved Error Logging and Consistent Error Response (500 Internal Server Error)
    logger.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
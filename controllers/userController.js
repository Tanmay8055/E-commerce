const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Registration
exports.registerUser = async (req, res) => {
  // ... (Registration logic from userRoutes.js)
};

// Login
exports.loginUser = async (req, res) => {
  // ... (Login logic from userRoutes.js)
};

// Get User by ID
exports.getUserById = async (req, res) => {
  // ... (Get User logic from userRoutes.js)
};
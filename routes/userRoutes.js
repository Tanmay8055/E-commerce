const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/userController');

// User Registration
router.post(
  '/register',
  [
    body('username').notEmpty().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
  ],
  userController.registerUser
);

// User Login
router.post('/login', userController.loginUser);

// Get User by ID (Example: Requires Authentication)
router.get('/:id', userController.getUserById);

module.exports = router;
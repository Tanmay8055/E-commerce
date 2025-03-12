const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authMiddleware, authorize } = require('../middleware/authMiddleware');

// Get all products
router.get('/', productController.getAllProducts);

// Get a single product by ID
router.get('/:id', productController.getProductById);

// Add a new product (Example: for admin use)
router.post('/', authMiddleware, authorize('admin'), productController.createProduct);

// Update a product by ID (Example: for admin use)
router.put('/:id', authMiddleware, authorize('admin'), productController.updateProduct);

// Delete a product by ID (Example: for admin use)
router.delete('/:id', authMiddleware, authorize('admin'), productController.deleteProduct);

module.exports = router;
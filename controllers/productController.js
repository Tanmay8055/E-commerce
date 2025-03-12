const Product = require('../models/Product');
const logger = require('../Utils/logger');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    logger.error('Error fetching products:', error);
    return res.status(500).json({ message: 'Error fetching products' });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    logger.error('Error fetching product:', error);
    return res.status(500).json({ message: 'Error fetching product' });
  }
};

// Add a new product (Example: for admin use)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    const newProduct = new Product({ name, description, price, imageUrl });
    await newProduct.save();
    return res
      .status(201)
      .json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    logger.error('Error creating product:', error);
    return res.status(500).json({ message: 'Error creating product' });
  }
};

// Update a product by ID (Example: for admin use)
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, imageUrl },
      { new: true } // Return the updated product
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res
      .status(200)
      .json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    logger.error('Error updating product:', error);
    return res.status(500).json({ message: 'Error updating product' });
  }
};

// Delete a product by ID (Example: for admin use)
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res
      .status(200)
      .json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    logger.error('Error deleting product:', error);
    return res.status(500).json({ message: 'Error deleting product' });
  }
};
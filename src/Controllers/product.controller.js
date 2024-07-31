const Cart = require('../Dao/Models/cartModel');
const Product = require('../Dao/Models/productModel');
const { sendEmail } = require('../utils/email');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('index', { products });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render('product', { product });
  } catch (error) {
    res.status(404).json({ message: 'Product not found' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect(`/products/${product._id}`);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      if (product.ownerRole === 'premium') {
        await sendEmail(product.ownerEmail, 'Product Deletion', 'Your product has been deleted.');
      }
      await product.remove();
    }
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};

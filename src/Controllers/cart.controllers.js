const Cart = require('../Dao/Models/cartModel');
const Product = require('../Dao/Models/productModel');
const { sendEmail } = require('../utils/email');
const User = require('../Dao/Models/userModel');

exports.createCart = async (req, res) => {
  try {
    const cart = new Cart({ userId: req.user._id });
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error creating cart' });
  }
};

exports.getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate('products');
    res.render('cart', { cart });
  } catch (error) {
    res.status(404).json({ message: 'Cart not found' });
  }
};

exports.addProductToCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    const product = await Product.findById(req.params.pid);
    cart.products.push(product);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product to cart' });
  }
};

exports.removeProductFromCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    cart.products.pull(req.params.pid);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error removing product from cart' });
  }
};

exports.checkoutCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate('products');
    // Here you would handle the payment process
    await sendEmail(req.user.email, 'Order Confirmation', 'Your order has been confirmed.');
    res.render('checkout', { cart });
  } catch (error) {
    res.status(500).json({ message: 'Error during checkout' });
  }
};

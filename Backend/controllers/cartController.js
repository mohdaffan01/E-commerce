const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get logged in user's cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.user._id }).populate({
      path: 'productId',
      select: 'name price image stock category',
    });
    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching cart items' });
  }
};

// @desc    Add product to cart
// @route   POST /api/cart/add
// @access  Private
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    const qty = Number(quantity) || 1;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if product is in stock
    if (product.stock < qty) {
      return res.status(400).json({ error: `Only ${product.stock} items left in stock` });
    }

    // Check if item is already in user's cart
    let cartItem = await Cart.findOne({ userId: req.user._id, productId });

    if (cartItem) {
      // Check if new quantity exceeds stock
      if (product.stock < cartItem.quantity + qty) {
        return res.status(400).json({ error: `Cannot add more. Only ${product.stock} items in stock.` });
      }
      cartItem.quantity += qty;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        userId: req.user._id,
        productId,
        quantity: qty,
      });
    }

    res.status(201).json({ message: 'Product added to cart', cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error adding product to cart' });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/update
// @access  Private
const updateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({ error: 'Product ID and quantity are required' });
    }

    const qty = Number(quantity);
    if (qty < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
    }

    // Check if product exists & has stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.stock < qty) {
      return res.status(400).json({ error: `Only ${product.stock} items in stock` });
    }

    const cartItem = await Cart.findOne({ userId: req.user._id, productId });
    if (!cartItem) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    cartItem.quantity = qty;
    await cartItem.save();

    res.json({ message: 'Cart updated successfully', cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error updating cart quantity' });
  }
};

// @desc    Remove product from cart
// @route   DELETE /api/cart/remove/:productId
// @access  Private
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cartItem = await Cart.findOneAndDelete({ userId: req.user._id, productId });
    if (!cartItem) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    res.json({ message: 'Product removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error removing product from cart' });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
};

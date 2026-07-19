const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartQuantity, removeFromCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

// Secure all cart routes with protect middleware
router.use(protect);

router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update', updateCartQuantity);
router.delete('/remove/:productId', removeFromCart);

module.exports = router;

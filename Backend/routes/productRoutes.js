const express = require('express');
const router = express.Router();
const { getProducts, getProductById, seedProducts, createProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getProducts);
router.post('/', protect, createProduct);
router.post('/seed', seedProducts);
router.get('/:id', getProductById);

module.exports = router;

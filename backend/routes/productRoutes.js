const express = require('express');
const router = express.Router();
const { getProducts, purchaseProduct } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getProducts);
router.post('/purchase', authMiddleware, purchaseProduct);

module.exports = router;

const Product = require('../models/Product');
const extractKeyword = require('../utils/extractKeyword');

exports.getProducts = async (req, res) => {
  try {
    const { search } = req.query;
    if (!search) return res.json([]);

    const keywords = extractKeyword(search);
    if (keywords.length === 0) return res.json([]);

    const regexQueries = keywords.map(word => ({
      $or: [
        { name: { $regex: word, $options: 'i' } },
        { category: { $regex: word, $options: 'i' } },
        { description: { $regex: word, $options: 'i' } }
      ]
    }));

    const products = await Product.find({ $and: regexQueries }).limit(10);
    res.json(products);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).send('Server error');
  }
};

exports.purchaseProduct = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.stockQuantity < quantity) return res.status(400).json({ message: 'Not enough stock' });

    product.stockQuantity -= quantity;
    await product.save();

    res.json({ message: 'Purchase successful', product });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

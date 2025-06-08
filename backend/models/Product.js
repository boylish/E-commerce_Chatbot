const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  description: String,
  imageUrl: String,
  stockQuantity: Number,
  rating: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);

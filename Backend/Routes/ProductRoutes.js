import express from 'express';
import Product from '../Models/Product.js';

const router = express.Router();

// GET /api/products - list all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().select('name category pricePerUnit peRatio');
    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/products/:id - product details including priceHistory
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

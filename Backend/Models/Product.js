import mongoose from 'mongoose';

// Schema for historical price points
const PricePointSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  price: { type: Number, required: true }
}, { _id: false });

// Product Schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g., Stock, Mutual Fund
  pricePerUnit: { type: Number, required: true }, // current price per unit
  peRatio: { type: Number }, // optional key metric
  description: { type: String, default: '' },
  priceHistory: { type: [PricePointSchema], default: [] }, // historical prices
  totalUnitsAvailable: { type: Number, default: 1000000 }, // optional for future use
}, { timestamps: true });

// Use existing model if it exists (for hot-reloading in dev)
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export default Product;

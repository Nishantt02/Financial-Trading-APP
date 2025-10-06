
import mongoose from 'mongoose';

const PricePointSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  price: { type: Number, required: true },
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  pricePerUnit: { type: Number, required: true },
  peRatio: { type: Number },
  description: { type: String, default: '' },
  priceHistory: { type: [PricePointSchema], default: [] },
  totalUnitsAvailable: { type: Number, default: 1000000 },
}, { timestamps: true });

// Proper way to avoid 'undefined' error
let Product;
try {
  Product = mongoose.model('Product'); // try to get existing
} catch (err) {
  Product = mongoose.model('Product', ProductSchema); // define if doesn't exist
}

export default Product;

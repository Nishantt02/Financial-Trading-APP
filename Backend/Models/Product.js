import mongoose from 'mongoose';

const PricePointSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  price: { type: Number, required: true }
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  pricePerUnit: { type: Number, required: true },
  peRatio: { type: Number },
  description: { type: String },
  priceHistory: { type: [PricePointSchema], default: [] }
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export default Product;

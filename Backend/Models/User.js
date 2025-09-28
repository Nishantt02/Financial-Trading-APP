import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  panNumber: { type: String, required: true },
  kycDocument: { type: String }, // path to uploaded file

  // Wallet balance, default ₹100,000
  wallet: { type: Number, default: 100000 },

  // Portfolio: products user owns with units and invested amount
  portfolio: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      units: { type: Number, default: 0 },
      investedAmount: { type: Number, default: 0 },
    },
  ],

  // Watchlist: list of product IDs
  watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
}, { timestamps: true });

export default mongoose.model("User", userSchema);

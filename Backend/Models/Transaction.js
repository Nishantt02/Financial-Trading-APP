import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  units: Number,
  totalAmount: Number,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Transaction", transactionSchema);

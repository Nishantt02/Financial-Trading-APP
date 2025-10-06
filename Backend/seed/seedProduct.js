// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import Product from "./Models/Product.js"; // adjust path
// dotenv.config();

// // Dummy products
// const generateHistory = (days = 30, min = 50, max = 150) => {
//   const arr = [];
//   const today = new Date();
//   for (let i = days; i > 0; i--) {
//     const date = new Date(today);
//     date.setDate(today.getDate() - i);
//     const price = +(Math.random() * (max - min) + min).toFixed(2);
//     arr.push({ date, price });
//   }
//   return arr;
// };

// export const products = [
//   { name: "Alpha Tech Fund", category: "Mutual Fund", pricePerUnit: 124.55, peRatio: 20.4, description: "Tech-heavy mutual fund", priceHistory: generateHistory() },
//   { name: "Beta Consumer Inc", category: "Stock", pricePerUnit: 78.3, peRatio: 15.2, description: "Consumer goods leader", priceHistory: generateHistory() },
//   { name: "Gamma Growth ETF", category: "ETF", pricePerUnit: 45.1, peRatio: 28.1, description: "Mid-cap growth ETF", priceHistory: generateHistory() },
//   { name: "Delta Income Fund", category: "Mutual Fund", pricePerUnit: 102.8, peRatio: 18.7, description: "Stable income-focused fund", priceHistory: generateHistory() },
//   { name: "Epsilon Tech Stock", category: "Stock", pricePerUnit: 88.4, peRatio: 22.5, description: "High-growth tech stock", priceHistory: generateHistory() }
// ];

// async function seed() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log("✅ Connected to MongoDB");

//     for (const product of products) {
//       const exists = await Product.findOne({ name: product.name });
//       if (!exists) {
//         await Product.create(product);
//         console.log(`✅ Inserted product: ${product.name}`);
//       } else {
//         console.log(`⚠️ Product already exists: ${product.name}`);
//       }
//     }

//     console.log("✅ Seed completed");
//     await mongoose.disconnect();
//   } catch (err) {
//     console.error("❌ Seed error:", err.message);
//     await mongoose.disconnect();
//   }
// }

// seed();

// backend/Routes/seed.js
import express from "express";
import Product from "../Models/Product.js";

const router = express.Router();

// Dummy products
const generateHistory = (days = 30, min = 50, max = 150) => {
  const arr = [];
  const today = new Date();
  for (let i = days; i > 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const price = +(Math.random() * (max - min) + min).toFixed(2);
    arr.push({ date, price });
  }
  return arr;
};

const products = [
  { name: "Alpha Tech Fund", category: "Mutual Fund", pricePerUnit: 124.55, peRatio: 20.4, description: "Tech-heavy mutual fund", priceHistory: generateHistory() },
  { name: "Beta Consumer Inc", category: "Stock", pricePerUnit: 78.3, peRatio: 15.2, description: "Consumer goods leader", priceHistory: generateHistory() },
  { name: "Gamma Growth ETF", category: "ETF", pricePerUnit: 45.1, peRatio: 28.1, description: "Mid-cap growth ETF", priceHistory: generateHistory() },
  { name: "Delta Income Fund", category: "Mutual Fund", pricePerUnit: 102.8, peRatio: 18.7, description: "Stable income-focused fund", priceHistory: generateHistory() },
  { name: "Epsilon Tech Stock", category: "Stock", pricePerUnit: 88.4, peRatio: 22.5, description: "High-growth tech stock", priceHistory: generateHistory() }
];

// GET /api/seed - insert dummy products
router.get("/", async (req, res) => {
  try {
    let inserted = 0;

    for (const product of products) {
      const exists = await Product.findOne({ name: product.name });
      if (!exists) {
        await Product.create(product);
        inserted++;
      }
    }

    res.json({
      success: true,
      message: `${inserted} products seeded successfully`
    });
  } catch (err) {
    console.error("Seed error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

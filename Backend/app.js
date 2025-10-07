import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import authRoutes from "./Routes/UserRoutes.js";
import productsRouter from "./Routes/ProductRoutes.js";
import Transactionroute from "./Routes/TransactionRoute.js";

dotenv.config();
const app = express();
const __dirname = path.resolve();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRouter);
app.use("/api/transaction", Transactionroute);

// Serve frontend (React/Vite build)
app.use(express.static(path.join(__dirname, "Frontend/dist")));

// ✅ FIX: use a regex instead of "*"
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
});

export default app;

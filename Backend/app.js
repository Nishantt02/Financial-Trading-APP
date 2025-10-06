import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./Routes/UserRoutes.js";
import productsRouter from "./Routes/ProductRoutes.js";
import Transactionroute from "./Routes/TransactionRoute.js";
import path from "path";

dotenv.config();
const app = express();
const __dirname = path.resolve();

// Allowed origins for CORS
const allowedOrigins = [
  "https://financial-trading-app-54.onrender.com",
  "http://localhost:5173"
];

// CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    console.log("Request origin:", origin);
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true
}));

// Logging & JSON parsing
app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRouter);
app.use("/api/transaction", Transactionroute);

// Serve React frontend (production)
app.use(express.static(path.join(__dirname, "Frontend/dist")));

// SPA catch-all using regex (works in all environments)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend/dist/index.html"));
});

export default app;

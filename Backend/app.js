import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from 'morgan';
import authRoutes from "./Routes/UserRoutes.js";
import productsRouter from './Routes/ProductRoutes.js';
import Transactionroute from './Routes/TransactionRoute.js';
import path from "path";

dotenv.config();
const app = express();
const __dirname = path.resolve();

// Allowed origins
const allowedOrigins = [
  "https://financial-trading-app-54.onrender.com", // frontend production
  "http://localhost:5173" // local dev
];

// CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies
}));

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// API routes
app.use("/api/auth", authRoutes);
app.use('/api/products', productsRouter);
app.use('/api/transaction', Transactionroute);

// Serve frontend
app.use(express.static(path.join(__dirname, "Frontend/dist")));

// SPA catch-all
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "Frontend/dist/index.html"));
});

export default app;

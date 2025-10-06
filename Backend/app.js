import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import fs from "fs";

import authRoutes from "./Routes/UserRoutes.js";
import productsRouter from "./Routes/ProductRoutes.js";
import Transactionroute from "./Routes/TransactionRoute.js";

dotenv.config();
const app = express();
const __dirname = path.resolve();

// ------------------------
// CORS config
// ------------------------
const allowedOrigins = [
  "http://localhost:5173"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true
}));

// ------------------------
// Logging & JSON parsing
// ------------------------
app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ------------------------
// API routes
// ------------------------
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRouter);
app.use("/api/transaction", Transactionroute);

// ------------------------
// Serve frontend (React/Vite)
// ------------------------
const frontendDist = path.join(__dirname, "../Frontend/dist");
app.use(express.static(frontendDist));

// SPA catch-all
app.get((req, res, next) => {
  if (!req.path.startsWith("/api")) {
    const indexFile = path.join(frontendDist, "index.html");
    if (fs.existsSync(indexFile)) return res.sendFile(indexFile);
    return res.status(404).send("Frontend not found");
  } else next();
});

export default app;

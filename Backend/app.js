
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import morgan from 'morgan';
// import authRoutes from "./Routes/UserRoutes.js";
// import productsRouter from './Routes/ProductRoutes.js'
// import Transactionroute from './Routes/TransactionRoute.js'
// import path from "path";
// dotenv.config();
// const app = express();
// const __dirname = path.resolve();

// app.use(cors());
// app.use(morgan('dev'));
// app.use(express.json());
// app.use("/uploads", express.static("uploads")); // serve uploaded files

// app.use("/api/auth", authRoutes);
// app.use('/api/products', productsRouter);
// app.use('/api/transaction',Transactionroute)
// app.use(express.static(path.join(__dirname, "Frontend/dist")));
// app.get('(.*)', (req, res) => {
//    res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
// });


// export default app;

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from 'morgan';
import authRoutes from "./Routes/UserRoutes.js";
import productsRouter from './Routes/ProductRoutes.js';
import seed from '../Backend/seed/seedProduct.js'

import Transactionroute from './Routes/TransactionRoute.js';
import path from "path";

dotenv.config();
const app = express();
const __dirname = path.resolve();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// API routes
app.use("/api/auth", authRoutes);
app.use('/api/products', productsRouter);
app.use('/api/transaction', Transactionroute);
app.use("/api/seed", seed);

// Serve frontend
app.use(express.static(path.join(__dirname, "Frontend/dist")));

// SPA catch-all (React/Vite)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "Frontend/dist/index.html"));
});

export default app;

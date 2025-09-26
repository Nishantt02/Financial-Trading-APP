
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from 'morgan';
import authRoutes from "./Routes/UserRoutes.js";
import productsRouter from './Routes/ProductRoutes.js'

dotenv.config();
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve uploaded files

app.use("/api/auth", authRoutes);
app.use('/api/products', productsRouter);

export default app;
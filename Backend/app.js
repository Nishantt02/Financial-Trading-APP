
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./Routes/UserRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve uploaded files

app.use("/api/auth", authRoutes);

export default app;
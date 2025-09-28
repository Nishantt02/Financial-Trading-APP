import express from "express";
import {
  buyProduct,
  getPortfolio,
  addToWatchlist,
  removeFromWatchlist,
} from '../Controllers/Transaction.js'
import authMiddleware from "../Middleware/Authmiddleware.js";

const router = express.Router();

router.post("/buy/:productId", authMiddleware, buyProduct);
router.get("/portfolio", authMiddleware, getPortfolio);
router.post("/watchlist/:productId", authMiddleware, addToWatchlist);
router.delete("/watchlist/:productId", authMiddleware, removeFromWatchlist);

export default router;

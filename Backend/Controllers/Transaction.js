import User from "../Models/User.js";
import Product from "../Models/Product.js";
import Transaction from "../Models/Transaction.js";


export const buyProduct = async (req, res) => {
  try {
    const { units } = req.body;
    const { productId } = req.params;

    const user = await User.findById(req.user._id); // get user from JWT
    if (!user) return res.status(404).json({ message: "User not found" });

    const product = await Product.findById(productId.trim());
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (!units || isNaN(units)) return res.status(400).json({ message: "Valid units required" });

    const totalCost = units * product.pricePerUnit;

    if (isNaN(user.wallet)) user.wallet = 100000; // default wallet
    if (user.wallet < totalCost) return res.status(400).json({ message: "Insufficient balance" });

    user.wallet -= totalCost;

    // Update portfolio
    const existing = user.portfolio.find(p => p.product.toString() === product._id.toString());
    if (existing) {
      existing.units += units;
      existing.investedAmount += totalCost;
    } else {
      user.portfolio.push({
        product: product._id,
        units,
        investedAmount: totalCost
      });
    }

    await user.save();

    await Transaction.create({
      user: user._id,
      product: product._id,
      units,
      totalAmount: totalCost
    });

    res.json({ message: "Purchase successful", wallet: user.wallet, portfolio: user.portfolio });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};





export const getPortfolio = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("portfolio.product") // portfolio product details
      .populate("watchlist");        // populate watchlist product details

    if (!user) return res.status(404).json({ message: "User not found" });

    // Map portfolio
    const portfolio = user.portfolio.map(item => {
      const price = item.product.pricePerUnit || 0;
      const currentValue = item.units * price;
      return {
        productId: item.product._id,
        productName: item.product.name,
        units: item.units,
        investedAmount: item.investedAmount,
        currentValue,
        returns: currentValue - item.investedAmount,
      };
    });

    // Map watchlist
    const watchlist = user.watchlist.map(p => ({
      _id: p._id,
      name: p.name,
    }));

    res.json({
      wallet: user.wallet || 100000,
      portfolio,
      watchlist,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


export const addToWatchlist = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user.watchlist.includes(req.params.productId)) {
    user.watchlist.push(req.params.productId);
    await user.save();
  }
  res.json({ message: "Added to watchlist", watchlist: user.watchlist });
};

export const removeFromWatchlist = async (req, res) => {
  const user = await User.findById(req.user._id);
  user.watchlist = user.watchlist.filter(p => p.toString() !== req.params.productId);
  await user.save();
  res.json({ message: "Removed from watchlist", watchlist: user.watchlist });
};

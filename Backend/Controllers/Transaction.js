import User from "../Models/User.js";
import Product from "../Models/Product.js";
import Transaction from "../Models/Transaction.js";

// export const buyProduct = async (req, res) => {
//   const { productId } = req.params;
//   const { units } = req.body;
//   const userId = req.user._id;

//   try {

// const product = await Product.findById(productId.trim());

//     const user = await User.findById(userId);

//     const totalCost = product.price * units;

//     if (user.wallet < totalCost) return res.status(400).json({ message: "Insufficient balance" });

//     user.wallet -= totalCost;

//     const existing = user.portfolio.find(p => p.product.toString() === productId);
//     if (existing) {
//       existing.units += units;
//       existing.investedAmount += totalCost;
//     } else {
//       user.portfolio.push({ product: productId, units, investedAmount: totalCost });
//     }

//     await user.save();
//     await Transaction.create({ user: userId, product: productId, units, totalAmount: totalCost });

//     res.json({ message: "Purchase successful" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const buyProduct = async (req, res) => {
  try {
    const { userId, units } = req.body;
    const { productId } = req.params;

    if (!userId) return res.status(400).json({ message: "userId is required" });
    if (!units || isNaN(units)) return res.status(400).json({ message: "Valid units required" });

    const user = await User.findById(userId.trim());
    if (!user) return res.status(404).json({ message: "User not found" });

    const product = await Product.findById(productId.trim());
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Ensure numbers
    const numUnits = Number(units);
    const pricePerUnit = Number(product.pricePerUnit);
    if (isNaN(pricePerUnit)) return res.status(400).json({ message: "Invalid product price" });

    const totalCost = numUnits * pricePerUnit;

    if (isNaN(user.wallet)) user.wallet = 100000; // default wallet if NaN
    if (user.wallet < totalCost) return res.status(400).json({ message: "Insufficient balance" });

    user.wallet -= totalCost;

    // Update portfolio safely
    const existing = user.portfolio.find(p => p.product.toString() === product._id.toString());
    if (existing) {
      existing.units += numUnits;
      existing.investedAmount += totalCost;
    } else {
      user.portfolio.push({
        product: product._id,
        units: numUnits,
        investedAmount: totalCost
      });
    }

    await user.save();

    await Transaction.create({
      user: user._id,
      product: product._id,
      units: numUnits,
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
    const userId = req.query.userId; // get from query
    if (!userId) return res.status(400).json({ message: "userId is required" });

    const user = await User.findById(userId.trim()).populate("portfolio.product");
    if (!user) return res.status(404).json({ message: "User not found" });

    const portfolio = user.portfolio.map(item => {
      const price = item.product.pricePerUnit || 0; // ensure number
      const currentValue = item.units * price;
      return {
        productName: item.product.name,
        units: item.units,
        investedAmount: item.investedAmount,
        currentValue,
        returns: currentValue - item.investedAmount,
      };
    });

    res.json({ wallet: user.wallet || 100000, portfolio });
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

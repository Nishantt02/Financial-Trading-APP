import { useEffect, useState } from "react";
import API from "../api";

export default function Portfolio() {
  const [wallet, setWallet] = useState(0);
  const [portfolio, setPortfolio] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  const fetchPortfolio = async () => {
    try {
      const res = await API.get("/transactions/portfolio");
      setWallet(res.data.wallet || 100000);
      setPortfolio(res.data.portfolio || []);
      setWatchlist(res.data.watchlist || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const removeFromWatchlist = async (productId) => {
    try {
      await API.delete(`/transactions/watchlist/${productId}`);
      setWatchlist((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.error(err);
      alert("Failed to remove from watchlist ❌");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Wallet Balance: ₹{wallet}</h2>

      <h3 className="text-xl font-semibold mb-2">Investments</h3>
      {portfolio.length === 0 ? (
        <p className="text-gray-500 mb-4">No investments yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {portfolio.map((item) => (
            <div
              key={item.productName}
              className="border rounded p-4 shadow hover:shadow-lg transition"
            >
              <h4 className="font-semibold">{item.productName}</h4>
              <p>Units: {item.units}</p>
              <p>Invested: ₹{item.investedAmount}</p>
              <p>Current: ₹{item.currentValue}</p>
              <p
                className={item.returns >= 0 ? "text-green-600" : "text-red-600"}
              >
                Returns: ₹{item.returns}
              </p>
            </div>
          ))}
        </div>
      )}

      <h3 className="text-xl font-semibold mb-2">Watchlist</h3>
      {watchlist.length === 0 ? (
        <p className="text-gray-500">No products in watchlist.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {watchlist.map((p) => (
            <div
              key={p._id}
              className="border rounded p-4 shadow hover:shadow-lg transition"
            >
              <h4 className="font-semibold">{p.name}</h4>
              <p>Price: ₹{p.pricePerUnit}</p>
              <button
                onClick={() => removeFromWatchlist(p._id)}
                className="bg-red-500 text-white px-3 py-1 mt-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

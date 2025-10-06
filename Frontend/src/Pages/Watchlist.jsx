import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../Api.js";
export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user portfolio and filter watchlist items
  const fetchWatchlist = async () => {
    try {
      const res = await API.get("/transactions/portfolio"); // portfolio has watchlist inside user object
      const portfolioData = res.data.portfolio || [];
      // If your backend has a separate watchlist array, use it instead
      const userWatchlist = res.data.watchlist || []; 
      setWatchlist(userWatchlist);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch watchlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await API.delete(`/transactions/watchlist/${productId}`);
      setWatchlist(watchlist.filter((item) => item._id !== productId));
      alert("Removed from watchlist ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to remove from watchlist ❌");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading watchlist...</p>;

  if (!watchlist.length)
    return <p className="text-center mt-20">No products in your watchlist.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Watchlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {watchlist.map((p) => (
          <div
            key={p._id}
            className="border rounded-lg shadow p-4 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-600">{p.category}</p>
            <p className="mt-2 font-medium">₹{p.pricePerUnit}</p>
            <div className="mt-4 flex gap-2">
              <Link
                to={`/products/${p._id}`}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
              >
                View & Buy
              </Link>
              <button
                onClick={() => handleRemove(p._id)}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

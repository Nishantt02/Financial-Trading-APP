import { useEffect, useState } from "react";
import API from "../api";

export default function Portfolio() {
  const [wallet, setWallet] = useState(100000);
  const [portfolio, setPortfolio] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch portfolio & watchlist
  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const res = await API.get("/transaction/portfolio");
      setWallet(res.data.wallet || 100000);
      setPortfolio(res.data.portfolio || []);
      setWatchlist(res.data.watchlist || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch portfolio");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  // Calculate totals
  const totalInvested = portfolio.reduce((sum, p) => sum + p.investedAmount, 0);
  const currentValue = portfolio.reduce((sum, p) => sum + p.currentValue, 0);
  const totalReturns = currentValue - totalInvested;

  if (loading) return <p className="p-6 text-center text-lg">Loading Portfolio...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center md:text-left text-gray-800">
        Portfolio Dashboard
      </h2>

      {/* Wallet & Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Wallet", value: wallet },
          { title: "Total Invested", value: totalInvested },
          { title: "Current Value", value: currentValue },
          { title: "Returns", value: totalReturns, isReturn: true },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg shadow-md flex flex-col justify-center items-center ${
              item.isReturn
                ? item.value >= 0
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
                : "bg-white text-gray-800"
            }`}
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-xl font-bold">₹{item.value}</p>
          </div>
        ))}
      </div>

      {/* Portfolio Table */}
      <div className="overflow-x-auto mb-8">
        <h3 className="text-2xl font-semibold mb-2 text-gray-700">Your Investments</h3>
        <table className="min-w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              {["Product", "Units", "Invested", "Current Value", "Returns"].map((h) => (
                <th key={h} className="p-3 text-left text-gray-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {portfolio.map((p) => (
              <tr
                key={p.productId}
                className="border-b last:border-b-0 hover:bg-gray-50 transition"
              >
                <td className="p-3">{p.productName}</td>
                <td className="p-3">{p.units}</td>
                <td className="p-3">₹{p.investedAmount}</td>
                <td className="p-3">₹{p.currentValue}</td>
                <td className={`p-3 font-semibold ${p.returns >= 0 ? "text-green-600" : "text-red-600"}`}>
                  ₹{p.returns}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Watchlist */}
      <div className="overflow-x-auto">
        <h3 className="text-2xl font-semibold mb-2 text-gray-700">Your Watchlist</h3>
        {watchlist.length === 0 ? (
          <p className="text-gray-500">No products in watchlist.</p>
        ) : (
          <table className="min-w-full border rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left text-gray-600">Product Name</th>
                <th className="p-3 text-center text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((p) => (
                <tr key={p._id} className="border-b last:border-b-0 hover:bg-gray-50 transition">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3 text-center">
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={async () => {
                        try {
                          await API.delete(`/transaction/watchlist/${p._id}`);
                          setWatchlist(watchlist.filter((w) => w._id !== p._id));
                        } catch (err) {
                          console.error(err);
                          alert("Failed to remove from watchlist ❌");
                        }
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

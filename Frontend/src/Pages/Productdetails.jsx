import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../Api.js";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ProductDetails() {
  const { id } = useParams(); // productId
  const [product, setProduct] = useState(null);
  const [units, setUnits] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        const data = res.data.data || res.data;

        // Format priceHistory dates for graph
        if (data.priceHistory) {
          data.priceHistory = data.priceHistory.map((p) => ({
            ...p,
            date: new Date(p.date).toLocaleDateString(),
          }));
        }

        setProduct(data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch product details ❌");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Buy product
  const handleBuy = async () => {
    if (units <= 0) return alert("Enter valid units");
    try {
      const res = await API.post(`/transaction/buy/${id}`, { units });
      alert(`Purchased ${units} unit(s) of ${product.name} `);
      console.log(res.data);
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Purchase failed ");
    }
  };

  // Add to watchlist
  const handleWatchlist = async () => {
    try {
      const res = await API.post(`/transaction/watchlist/${id}`);
      alert(`${product.name} added to watchlist `);
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add to watchlist ❌");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <p className="text-gray-600">{product.category}</p>
      <p className="mt-2">Price per Unit: ₹{product.pricePerUnit}</p>
      <p className="text-sm text-gray-500">P/E Ratio: {product.peRatio}</p>
      <p className="mt-2">{product.description}</p>

      <div className="mt-4 flex items-center gap-2">
        <input
          type="number"
          min="1"
          value={units}
          onChange={(e) => setUnits(Number(e.target.value))}
          className="border rounded px-2 py-1 w-24"
        />
        <button
          onClick={handleBuy}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Buy
        </button>
        <button
          onClick={handleWatchlist}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          + Watchlist
        </button>
      </div>

      {/* Price History Graph */}
      {product.priceHistory && product.priceHistory.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Price History</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={product.priceHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#4F46E5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

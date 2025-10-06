import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../Api.js";
export default function ProductDetail() {
const { id } = useParams(); // productId from URL
const [product, setProduct] = useState(null);
const [units, setUnits] = useState(1);
const [message, setMessage] = useState("");

// Fetch product details
useEffect(() => {
const fetchProduct = async () => {
try {
const res = await API.get(`/products/${id}`);
setProduct(res.data);
} catch (err) {
console.error(err);
}
};
fetchProduct();
}, [id]);

// Buy product function
const handleBuy = async () => {
try {
const res = await API.post("/transactions/buy", {
productId: id,
units,
});
setMessage(`✅ Purchase successful! Wallet: ₹${res.data.wallet}`);
} catch (err) {
console.error(err);
setMessage("❌ Purchase failed. Please try again.");
}
};

if (!product) return <p>Loading product...</p>;

return ( <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow"> <h2 className="text-2xl font-bold mb-2">{product.name}</h2> <p className="mb-2">Price: ₹{product.pricePerUnit}</p> <p className="mb-4">{product.description}</p>

```
  <div className="flex items-center gap-3 mb-4">
    <label>Units:</label>
    <input
      type="number"
      min="1"
      value={units}
      onChange={(e) => setUnits(Number(e.target.value))}
      className="border px-2 py-1 w-20"
    />
  </div>

  <button
    onClick={handleBuy}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    Buy Now
  </button>

  {message && <p className="mt-4 text-green-600">{message}</p>}
</div>

)
}
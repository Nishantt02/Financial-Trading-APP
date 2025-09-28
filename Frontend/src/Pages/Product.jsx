import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../Api";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products").then((res) => setProducts(res.data.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <Link key={p._id} to={`/products/${p._id}`}
            className="border rounded-lg shadow p-4 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-600">{p.category}</p>
            <p className="mt-2 font-medium">₹{p.pricePerUnit}</p>
            <p className="text-sm text-gray-500">P/E: {p.peRatio}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../Api";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`/products/${id}`).then((res) => setProduct(res.data.data));
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <p className="text-gray-600">{product.category}</p>
      <p className="mt-2">Price per Unit: ₹{product.pricePerUnit}</p>
      <p>P/E Ratio: {product.peRatio}</p>
      <p className="mt-2">{product.description}</p>

      <h3 className="text-xl font-semibold mt-6 mb-2">Price History</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={product.priceHistory}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(d) => new Date(d).toLocaleDateString()} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#4F46E5" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

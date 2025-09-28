// // import { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";

// // import API from "../api";
// // export default function Products() {
// //   const [products, setProducts] = useState([]);

// //   useEffect(() => {
// //     API.get("/products").then((res) => setProducts(res.data.data));
// //   }, []);

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-2xl font-bold mb-4">Available Products</h2>
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //         {products.map((p) => (
// //           <Link key={p._id} to={`/products/${p._id}`}
// //             className="border rounded-lg shadow p-4 hover:shadow-lg transition">
// //             <h3 className="text-lg font-semibold">{p.name}</h3>
// //             <p className="text-sm text-gray-600">{p.category}</p>
// //             <p className="mt-2 font-medium">₹{p.pricePerUnit}</p>
// //             <p className="text-sm text-gray-500">P/E: {p.peRatio}</p>
// //           </Link>
// //         ))}
// //       </div>
// //     </div>
// //   );
// //  }


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import API from "../api";

// export default function Products() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await API.get("/products");
//         setProducts(res.data.data || []); // adjust based on API response
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const addToWatchlist = async (productId) => {
//     try {
//       await API.post(`/transactions/watchlist/${productId}`);
//       alert("Added to watchlist ✅");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add watchlist ❌");
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Available Products</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {products.map((p) => (
//           <div
//             key={p._id}
//             className="border rounded shadow p-4 hover:shadow-lg transition"
//           >
//             <h3 className="text-lg font-semibold">{p.name}</h3>
//             <p className="text-sm text-gray-600">{p.category}</p>
//             <p className="mt-1 font-medium">₹{p.pricePerUnit}</p>
//             <p className="text-sm text-gray-500">P/E: {p.peRatio}</p>

//             <div className="flex gap-2 mt-4">
//               <Link
//                 to={`/products/${p._id}`}
//                 className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
//               >
//                 View & Buy
//               </Link>
//               <button
//                 onClick={() => addToWatchlist(p._id)}
//                 className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600"
//               >
//                 + Watchlist
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    const fetchWatchlist = async () => {
      try {
        const res = await API.get("/transaction/portfolio"); // get user's watchlist
        setWatchlist(res.data.watchlist || []);
      } catch (err) {
        console.error("Failed to fetch watchlist:", err);
      }
    };

    fetchProducts();
    fetchWatchlist();
  }, []);

  const addToWatchlist = async (productId) => {
    try {
      await API.post(`/transaction/watchlist/${productId}`);
      setWatchlist([...watchlist, productId]); // update locally
      alert("Added to watchlist ✅");
    } catch (err) {
      console.error("Failed to add to watchlist:", err);
      alert("Failed to add watchlist ❌");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Available Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => {
          const isInWatchlist = watchlist.includes(p._id);
          return (
            <div
              key={p._id}
              className="border rounded shadow p-4 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-600">{p.category}</p>
              <p className="mt-1 font-medium">₹{p.pricePerUnit}</p>
              <p className="text-sm text-gray-500">P/E: {p.peRatio}</p>

              <div className="flex gap-2 mt-4">
                <Link
                  to={`/products/${p._id}`}
                  className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                >
                  View & Buy
                </Link>
                <button
                  onClick={() => addToWatchlist(p._id)}
                  disabled={isInWatchlist}
                  className={`px-3 py-2 rounded text-white ${
                    isInWatchlist
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
                >
                  {isInWatchlist ? "In Watchlist" : "+ Watchlist"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

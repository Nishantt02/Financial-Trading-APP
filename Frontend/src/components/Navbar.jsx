// import { Link, useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // clear token
//     navigate("/login"); // redirect to login
//   };

//   const isLoggedIn = !!localStorage.getItem("token");

//   return (
//     <nav className="bg-gray-800 text-white p-4 flex justify-between">
//       <h1 className="font-bold text-lg">Trading App</h1>
//       <div className="space-x-4">
//         {/* Show Products link only if logged in */}
//         {isLoggedIn && (
//           <Link to="/products" className="hover:text-gray-300">
//             Products
//           </Link>
//         )}

//         {!isLoggedIn ? (
//           <>
//             <Link to="/login" className="hover:text-gray-300">
//               Login
//             </Link>
//             <Link to="/signup" className="hover:text-gray-300">
//               Signup
//             </Link>

            
//           </>
//         ) : (
//           <button
//             onClick={handleLogout}
//             className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
//           >
//             Logout
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

export default function Navbar() {
  const [wallet, setWallet] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchWallet();
    }
  }, []);

  const fetchWallet = async () => {
    try {
      const res = await API.get("/transactions/portfolio");
      setWallet(res.data.wallet || 100000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        FinTradeApp
      </Link>

      <div className="flex items-center gap-6">
        {isLoggedIn && (
          <>
            <Link to="/products" className="hover:underline">
              Products
            </Link>
            <Link to="/portfolio" className="hover:underline flex items-center gap-2">
              Portfolio
              <span className="bg-green-500 px-2 py-0.5 rounded text-sm">
                ₹{wallet}
              </span>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

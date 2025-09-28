import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Usercontext.jsx";

export default function Navbar() {
  const { user, wallet, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        FinTradeApp
      </Link>

      <div className="flex items-center gap-6">
        {user ? (
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
        ) : (
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

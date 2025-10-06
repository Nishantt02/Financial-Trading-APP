// frontend/src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ProtectedRoute from "./ProtectRoute";
import Products from "./Pages/Product";
import ProductDetail from "./Pages/Productdetails";
import Portfolio from "./Pages/Portfolio";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/portfolio"
          element={
            <ProtectedRoute>
              <Portfolio />
            </ProtectedRoute>
          }
        />

        {/* Default redirect → login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

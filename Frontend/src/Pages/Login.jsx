import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Usercontext";
import API from "../Api.js";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setUser, fetchUser } = useContext(UserContext); // Access context

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);

      // Update context so Navbar reacts immediately
      setUser({ token: res.data.token });
      fetchUser(); // fetch wallet & user info
      alert("Login successful!");
      navigate("/products"); // redirect to products
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit} className="w-96 p-6 bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

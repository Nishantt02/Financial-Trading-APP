import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    panNumber: "",
    kycDocument:""
  });
  const [kycDocument, setKycDocument] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    setKycDocument(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // prepare form data
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });
      if (kycDocument) formData.append("kycDocument", kycDocument);

      await API.post("/auth/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Signup successful, please login!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-6 bg-white shadow rounded"
        encType="multipart/form-data"
      >
        <h2 className="text-xl font-bold mb-4">Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />

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

        <input
          type="text"
          name="panNumber"
          placeholder="PAN Number"
          value={form.panNumber}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />

       
        <input
          type="file"
          name="kycDocument"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Signup
        </button>
      </form>
    </div>
  );
}

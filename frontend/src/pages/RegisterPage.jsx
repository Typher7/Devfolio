import React, { useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
    handle: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await api.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm ring-1 ring-gray-200 my-12">
      <h2 className="text-2xl font-bold tracking-tight mb-6">Register</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Handle (username)</label>
          <input
            type="text"
            name="handle"
            value={formData.handle}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 text-white py-2 text-sm font-semibold shadow-sm hover:bg-indigo-700 disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

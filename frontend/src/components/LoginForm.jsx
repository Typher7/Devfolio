import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setUser,
  setAuthenticated,
  setAuthChecked,
} from "../redux/slices/authSlice";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", { email, password });
      dispatch(setUser(response.data.user));
      dispatch(setAuthenticated(true));
      dispatch(setAuthChecked(true));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm ring-1 ring-gray-200"
    >
      <h2 className="text-2xl font-bold tracking-tight mb-6">Login</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 text-white py-2 text-sm font-semibold shadow-sm hover:bg-indigo-700 disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

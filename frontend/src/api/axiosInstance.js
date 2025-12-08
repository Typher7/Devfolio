import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Do not automatically attach an Authorization header from localStorage.
// We rely on cookie-based sessions (`withCredentials: true`) for authentication.

export default api;

import axios from "axios";
import store from "../redux/store.js";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

console.log("[Axios] Using API_BASE_URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Always send cookies
  timeout: 10000,
});

// Log requests for debugging
api.interceptors.request.use((config) => {
  console.log(`[Axios] ${config.method.toUpperCase()} ${config.url}`);
  
  // Fallback: if no cookie present, try sending token from Redux state
  const state = store.getState();
  if (state.auth.token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${state.auth.token}`;
    console.log("[Axios] Added token from Redux to Authorization header");
  }
  
  return config;
});

// Log responses for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`[Axios] Response OK:`, response.status);
    return response;
  },
  (error) => {
    console.error(
      `[Axios] Error:`,
      error.response?.status,
      error.response?.data?.error || error.message
    );
    return Promise.reject(error);
  }
);

// Do not automatically attach an Authorization header from localStorage.
// We rely on cookie-based sessions (`withCredentials: true`) for authentication.

export default api;

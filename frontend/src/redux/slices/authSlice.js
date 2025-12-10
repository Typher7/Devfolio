import { createSlice } from "@reduxjs/toolkit";

const savedToken =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const initialState = {
  user: null,
  token: savedToken,
  isLoading: false,
  error: null,
  // Hydrate initial auth from persisted token; /auth/me will confirm
  isAuthenticated: !!savedToken,
  authChecked: false, // Track if initial auth check is complete
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = !!action.payload;
    },
    setToken: (state, action) => {
      // Keep token in state only (do not persist to localStorage)
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
      if (typeof window !== "undefined") {
        if (action.payload) {
          localStorage.setItem("token", action.payload);
        } else {
          localStorage.removeItem("token");
        }
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.authChecked = false; // Reset so next hydration happens fresh
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
    setAuthChecked: (state, action) => {
      state.authChecked = !!action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setUser,
  setAuthenticated,
  setToken,
  logout,
  setLoading,
  setError,
  setAuthChecked,
} = authSlice.actions;
export default authSlice.reducer;

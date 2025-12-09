import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  // Do not assume authenticated on load; hydrate session via /auth/me
  isAuthenticated: false,
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
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.authChecked = false; // Reset so next hydration happens fresh
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

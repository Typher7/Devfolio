import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import BlogPage from "./pages/BlogPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ManageProjects from "./pages/dashboard/ManageProjects";
import ManagePosts from "./pages/dashboard/ManagePosts";
import ManageAwards from "./pages/dashboard/ManageAwards";
import EditProfile from "./pages/dashboard/EditProfile";
import PublicPortfolio from "./pages/PublicPortfolio";
import "./styles/index.css";
import { useDispatch, useSelector } from "react-redux";
import api from "./api/axiosInstance";
import { setUser, setAuthenticated } from "./redux/slices/authSlice";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((s) => s.auth);
  const [authChecked, setAuthChecked] = useState(false);

  // Hydrate session on app load (cookie-based session)
  useEffect(() => {
    const hydrate = async () => {
      try {
        const res = await api.get("/auth/me");
        if (res?.data) {
          dispatch(setUser(res.data));
          dispatch(setAuthenticated(true));
        } else {
          dispatch(setAuthenticated(false));
        }
      } catch (err) {
        dispatch(setAuthenticated(false));
      } finally {
        setAuthChecked(true);
      }
    };

    hydrate();
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            // Wait until we've checked session to avoid flicker
            !authChecked ? (
              <HomePage />
            ) : isAuthenticated && user?.handle ? (
              <Navigate to={`/${user.handle}`} replace />
            ) : (
              <HomePage />
            )
          }
        />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/projects"
          element={
            <ProtectedRoute>
              <ManageProjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/posts"
          element={
            <ProtectedRoute>
              <ManagePosts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/awards"
          element={
            <ProtectedRoute>
              <ManageAwards />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        {/* Public Portfolio (Vanity URL) */}
        <Route path="/:handle" element={<PublicPortfolio />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import PublicLayout from "./components/PublicLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
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
import {
  setUser,
  setAuthenticated,
  setAuthChecked,
} from "./redux/slices/authSlice";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, authChecked } = useSelector((s) => s.auth);

  // Hydrate session on app load (cookie-based session)
  useEffect(() => {
    const hydrate = async () => {
      try {
        console.debug("[App] Starting auth hydration...");
        const res = await api.get("/auth/me", { timeout: 10000 });
        console.debug("[App] Auth response:", res?.data);
        if (res?.data) {
          dispatch(setUser(res.data));
          dispatch(setAuthenticated(true));
        } else {
          dispatch(setAuthenticated(false));
        }
      } catch (err) {
        console.debug("[App] Auth hydration error:", err?.message);
        dispatch(setAuthenticated(false));
      } finally {
        console.debug("[App] Auth check complete, setting authChecked=true");
        dispatch(setAuthChecked(true));
      }
    };

    // Set a fallback timeout in case hydration takes too long
    const timeoutId = setTimeout(() => {
      console.warn("[App] Auth hydration timeout, proceeding without session");
      dispatch(setAuthChecked(true));
    }, 12000);

    hydrate().finally(() => clearTimeout(timeoutId));
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Public Portfolio Route - Separate Layout (No Navbar/Dashboard Access) */}
        <Route
          path="/portfolio/:handle"
          element={
            <PublicLayout>
              <PublicPortfolio />
            </PublicLayout>
          }
        />

        {/* All other routes use the standard Navbar */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HomePage />
            </>
          }
        />
        <Route
          path="/projects"
          element={
            <>
              <Navbar />
              <ProjectsPage />
            </>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <>
              <Navbar />
              <ProjectDetailPage />
            </>
          }
        />
        <Route
          path="/blog"
          element={
            <>
              <Navbar />
              <BlogPage />
            </>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <>
              <Navbar />
              <BlogPostPage />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <LoginPage />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <RegisterPage />
            </>
          }
        />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/dashboard/projects"
          element={
            <>
              <Navbar />
              <ProtectedRoute>
                <ManageProjects />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/dashboard/posts"
          element={
            <>
              <Navbar />
              <ProtectedRoute>
                <ManagePosts />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/dashboard/awards"
          element={
            <>
              <Navbar />
              <ProtectedRoute>
                <ManageAwards />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <>
              <Navbar />
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

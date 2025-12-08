import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import api from "../api/axiosInstance";
import { logout } from "../redux/slices/authSlice";

export default function DashboardPage() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const projects = useSelector((state) => state.projects.projects);
  const posts = useSelector((state) => state.posts.posts);
  const awards = useSelector((state) => state.awards.awards);
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Welcome, {user?.full_name}!</h1>
            <p className="text-gray-600">Manage your portfolio content</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <Link
            to="/dashboard/projects"
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg text-center font-bold"
          >
            Manage Projects
          </Link>
          <Link
            to="/dashboard/posts"
            className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg text-center font-bold"
          >
            Manage Blog Posts
          </Link>
          <Link
            to="/dashboard/awards"
            className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg text-center font-bold"
          >
            Manage Awards
          </Link>
          <Link
            to="/dashboard/profile"
            className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-lg text-center font-bold"
          >
            Edit Profile
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-blue-900 font-bold">Projects</h3>
            <p className="text-3xl font-bold text-blue-600">
              {projects.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-green-900 font-bold">Blog Posts</h3>
            <p className="text-3xl font-bold text-green-600">{posts.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-purple-900 font-bold">Awards</h3>
            <p className="text-3xl font-bold text-purple-600">
              {awards.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-orange-900 font-bold">Profile</h3>
            <p className="text-3xl font-bold text-orange-600">✓</p>
          </div>
        </div>

        {/* Quick Links to Public Portfolio */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">View Your Portfolio</h2>
          <p className="text-gray-600 mb-4">
            Your public portfolio is available at:
          </p>
          <div className="flex gap-4">
            <a
              href={`/${user?.handle}`}
              target="_blank"
              rel="noreferrer"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Visit Public Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

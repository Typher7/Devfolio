import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { useEffect } from "react";
import api from "../api/axiosInstance";
import { logout, setUser } from "../redux/slices/authSlice";
import { setProjects } from "../redux/slices/projectsSlice";
import { setPosts } from "../redux/slices/postsSlice";
import { setAwards } from "../redux/slices/awardsSlice";
import {
  FiFolder,
  FiEdit3,
  FiAward,
  FiUser,
  FiExternalLink,
  FiTrendingUp,
  FiEye,
} from "react-icons/fi";
import TextType from "../components/TextType";

export default function DashboardPage() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const projects = useSelector((state) => state.projects.projects);
  const posts = useSelector((state) => state.posts.posts);
  const awards = useSelector((state) => state.awards.awards);
  const dispatch = useDispatch();

  // Hydrate user from server (cookie-based session) when dashboard mounts
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/auth/me");
        if (res?.data) {
          dispatch(setUser(res.data));
        }
      } catch (err) {
        // Not critical here — user will be redirected if unauthenticated
        console.debug(
          "Could not hydrate user on dashboard:",
          err?.message || err
        );
      }
    };

    const fetchAll = async () => {
      await fetchMe();

      try {
        const [pRes, postRes, aRes] = await Promise.all([
          api.get("/projects/mine"),
          api.get("/posts/mine"),
          api.get("/awards/mine"),
        ]);

        if (pRes?.data) dispatch(setProjects(pRes.data));
        if (postRes?.data) dispatch(setPosts(postRes.data));
        if (aRes?.data) dispatch(setAwards(aRes.data));
      } catch (err) {
        console.debug("Could not fetch dashboard items:", err?.message || err);
      }
    };

    fetchAll();
  }, [dispatch]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const publishedProjects = projects.filter((p) => p.is_published).length;
  const publishedPosts = posts.filter((p) => p.is_published).length;
  const publishedAwards = awards.filter((a) => a.is_published).length;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
            <TextType
              text={[
                `Welcome back, ${user?.full_name}!`,
                "Ready to update your portfolio?",
              ]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </h1>
          <p className="text-lg text-slate-600">
            Here's an overview of your portfolio
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Projects Stat */}
          <div className="group relative bg-white rounded-xl border border-slate-200 p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors">
                <FiFolder className="h-6 w-6" />
              </div>
              <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-2.5 py-1 text-xs font-semibold">
                {publishedProjects} Published
              </span>
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-1">
              Projects
            </h3>
            <p className="text-3xl font-bold text-slate-900">
              {projects.length}
            </p>
          </div>

          {/* Blog Posts Stat */}
          <div className="group relative bg-white rounded-xl border border-slate-200 p-6 hover:shadow-xl hover:border-green-300 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-green-100 text-green-600 group-hover:bg-green-200 transition-colors">
                <FiEdit3 className="h-6 w-6" />
              </div>
              <span className="inline-flex items-center rounded-full bg-green-50 text-green-700 px-2.5 py-1 text-xs font-semibold">
                {publishedPosts} Published
              </span>
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-1">
              Blog Posts
            </h3>
            <p className="text-3xl font-bold text-slate-900">{posts.length}</p>
          </div>

          {/* Awards Stat */}
          <div className="group relative bg-white rounded-xl border border-slate-200 p-6 hover:shadow-xl hover:border-amber-300 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-amber-100 text-amber-600 group-hover:bg-amber-200 transition-colors">
                <FiAward className="h-6 w-6" />
              </div>
              <span className="inline-flex items-center rounded-full bg-amber-50 text-amber-700 px-2.5 py-1 text-xs font-semibold">
                {publishedAwards} Published
              </span>
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-1">Awards</h3>
            <p className="text-3xl font-bold text-slate-900">{awards.length}</p>
          </div>

          {/* Profile Stat */}
          <div className="group relative bg-white rounded-xl border border-slate-200 p-6 hover:shadow-xl hover:border-indigo-300 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200 transition-colors">
                <FiUser className="h-6 w-6" />
              </div>
              <span className="inline-flex items-center rounded-full bg-green-50 text-green-700 px-2.5 py-1 text-xs font-semibold">
                Active
              </span>
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-1">Profile</h3>
            <p className="text-3xl font-bold text-slate-900">✓</p>
          </div>
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <FiTrendingUp className="h-6 w-6 text-blue-600" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/dashboard/projects"
                className="group flex items-center gap-3 p-4 rounded-lg border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-400 transition-all"
              >
                <FiFolder className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-semibold text-slate-900 text-sm">
                    Projects
                  </p>
                  <p className="text-xs text-slate-600">Manage portfolio</p>
                </div>
              </Link>

              <Link
                to="/dashboard/posts"
                className="group flex items-center gap-3 p-4 rounded-lg border-2 border-green-200 bg-green-50 hover:bg-green-100 hover:border-green-400 transition-all"
              >
                <FiEdit3 className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-semibold text-slate-900 text-sm">
                    Blog Posts
                  </p>
                  <p className="text-xs text-slate-600">Write & publish</p>
                </div>
              </Link>

              <Link
                to="/dashboard/awards"
                className="group flex items-center gap-3 p-4 rounded-lg border-2 border-amber-200 bg-amber-50 hover:bg-amber-100 hover:border-amber-400 transition-all"
              >
                <FiAward className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Awards</p>
                  <p className="text-xs text-slate-600">Add achievements</p>
                </div>
              </Link>

              <Link
                to="/dashboard/profile"
                className="group flex items-center gap-3 p-4 rounded-lg border-2 border-indigo-200 bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-400 transition-all"
              >
                <FiUser className="h-5 w-5 text-indigo-600" />
                <div>
                  <p className="font-semibold text-slate-900 text-sm">
                    Profile
                  </p>
                  <p className="text-xs text-slate-600">Update info</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Public Portfolio Card */}
          <div className="bg-linear-to-br from-indigo-600 to-blue-700 rounded-xl p-8 shadow-xl text-white">
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <FiEye className="h-6 w-6" />
              Your Public Portfolio
            </h2>
            <p className="text-blue-100 mb-6 leading-relaxed">
              {user?.handle
                ? "Share your work with the world. Your portfolio is live and ready to impress!"
                : "Set up your handle in your profile to activate your public portfolio."}
            </p>
            {user?.handle ? (
              <a
                href={`/portfolio/${user.handle}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-md hover:shadow-lg"
              >
                <span>Visit Portfolio</span>
                <FiExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <Link
                to="/dashboard/profile"
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-all border border-white/20"
              >
                <span>Set Up Handle</span>
                <FiUser className="h-4 w-4" />
              </Link>
            )}
            {user?.handle && (
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-xs text-blue-100 mb-1">
                  Your portfolio URL:
                </p>
                <code className="text-sm bg-white/10 px-3 py-1 rounded text-white font-mono">
                  devfolio-web.onrender.com/portfolio/{user.handle}
                </code>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            💡 Quick Tips
          </h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Add at least 3 projects to showcase your best work</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>
                Write engaging blog posts to share your knowledge and expertise
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>
                Keep your profile updated with your latest skills and
                achievements
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Use high-quality images for better visual impact</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

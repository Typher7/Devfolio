import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import api from "../api/axiosInstance";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Only expose nav links that make sense for the current auth state
  const navItems = isAuthenticated
    ? [
        { label: "Home", to: "/" },
        { label: "Projects", to: "/projects" },
        { label: "Blog", to: "/blog" },
      ]
    : [{ label: "Home", to: "/" }];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    try {
      // Call backend to clear the cookie
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      // Clear Redux state regardless of backend response
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur supports-backdrop-filter:bg-slate-950/80 ring-1 ring-white/5">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/dev.png"
            alt="DevFolio logo"
            className="h-10 w-10 rounded-xl object-cover shadow-lg shadow-indigo-500/30"
            loading="lazy"
          />
          <div className="leading-tight">
            <p className="text-lg font-semibold text-white">DevFolio</p>
            <p className="text-xs text-slate-300">Showcase beautifully</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2 px-2 py-2 rounded-full bg-white/5 ring-1 ring-white/10 backdrop-blur">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive: active }) =>
                `relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full ${
                  active || isActive(item.to)
                    ? "text-white bg-white/10 shadow-inner"
                    : "text-slate-200 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Auth controls + mobile toggle */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="hidden md:inline-flex items-center rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:border-indigo-300 hover:text-indigo-100 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="hidden md:inline-flex items-center rounded-lg bg-linear-to-r from-red-500 to-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-md transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden md:inline-flex items-center rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:border-indigo-300 hover:text-indigo-100 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hidden md:inline-flex items-center rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-md transition"
              >
                Register
              </Link>
            </>
          )}

          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg px-3 py-2 text-slate-200 hover:text-white hover:bg-white/10"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-950/90 backdrop-blur">
          <div className="px-6 py-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive: active }) =>
                  `block rounded-lg px-3 py-2 text-sm font-medium ${
                    active || isActive(item.to)
                      ? "bg-white/10 text-white"
                      : "text-slate-200 hover:text-white hover:bg-white/5"
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="mt-2 w-full inline-flex items-center justify-center rounded-lg bg-linear-to-r from-red-500 to-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-md transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/5"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="mt-2 w-full inline-flex items-center justify-center rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-md transition"
                  onClick={() => setMobileOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

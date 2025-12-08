import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import GooeyNav from "./GooeyNav";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-40 bg-gradient-to-b from-slate-900/80 to-slate-900/60 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 border-b border-white/10 ring-1 ring-white/5">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-white select-none hover:text-indigo-300"
        >
          DevFolio
        </Link>

        <div className="hidden md:block">
          <GooeyNav
            items={[
              { label: "Home", to: "/" },
              { label: "Projects", to: "/projects" },
              { label: "Blog", to: "/blog" },
            ]}
            animationTime={600}
            particleCount={18}
            particleDistances={[90, 16]}
            particleR={100}
            timeVariance={250}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            initialActiveIndex={0}
            className=""
            containerClassName="relative flex items-center gap-2 py-2 px-2 rounded-full bg-white/10 ring-1 ring-white/10 backdrop-blur"
            blobClassName="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-indigo-500/70"
            itemClassName="relative z-10 px-4 py-2 text-sm font-medium transition-colors text-slate-200 hover:text-white"
            activeItemClassName="text-white"
          />
        </div>

        <div className="flex gap-3 items-center">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="text-indigo-300 hover:text-white font-medium"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center rounded-md bg-red-600 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-indigo-300 hover:text-white font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center rounded-md bg-indigo-600 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600"
              >
                Register
              </Link>
            </>
          )}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md px-2 py-2 text-slate-200 hover:text-white hover:bg-white/10"
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
        <div className="md:hidden border-t border-white/10 bg-slate-900/80 backdrop-blur">
          <div className="px-6 py-4 space-y-2">
            <Link
              to="/"
              className="block text-slate-200 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/projects"
              className="block text-slate-200 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              Projects
            </Link>
            <Link
              to="/blog"
              className="block text-slate-200 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              Blog
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block text-slate-200 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="mt-2 w-full inline-flex items-center justify-center rounded-md bg-red-600 text-white px-4 py-2 text-sm font-semibold hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-slate-200 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="mt-2 w-full inline-flex items-center justify-center rounded-md bg-indigo-600 text-white px-4 py-2 text-sm font-semibold hover:bg-indigo-700"
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

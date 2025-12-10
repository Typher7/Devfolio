import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../dev.png";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple public navbar - no auth buttons */}
      <nav className="sticky top-0 z-40 bg-white/95 border-b border-gray-200 shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logoImg}
              alt="DevFolio logo"
              className="h-10 w-10 rounded-xl object-cover shadow-md shadow-indigo-500/30"
              loading="lazy"
            />
            <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all">
              DevFolio
            </span>
          </Link>
          <div className="flex gap-3 items-center">
            <Link
              to="/login"
              className="inline-flex items-center rounded-md border-2 border-blue-600 text-blue-600 px-5 py-2 text-sm font-semibold hover:bg-blue-50 transition-all"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center rounded-md bg-linear-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 text-sm font-semibold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              Create Your Portfolio
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}

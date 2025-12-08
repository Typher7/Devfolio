import React from "react";
import { Link } from "react-router-dom";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple public navbar - no auth buttons */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-900 hover:text-blue-600"
          >
            DevFolio
          </Link>
          <div className="flex gap-4">
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-blue-700"
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

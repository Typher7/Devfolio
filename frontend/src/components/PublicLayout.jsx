import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../dev.png";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function PublicLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple public navbar - no auth buttons */}
      <nav className="sticky top-0 z-40 bg-white/95 border-b border-gray-200 shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logoImg}
              alt="DevFolio logo"
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl object-cover shadow-md shadow-indigo-500/30"
              loading="lazy"
            />
            <span className="text-xl sm:text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all">
              DevFolio
            </span>
          </Link>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-3 items-center">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center rounded-md border-2 border-blue-600 text-blue-600 px-4 py-2.5 text-sm font-semibold hover:bg-blue-50 transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center rounded-md bg-linear-to-r from-blue-600 to-indigo-600 text-white px-4 py-2.5 text-sm font-semibold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
              >
                Create Your Portfolio
              </Link>
            </div>
          </div>
        )}
      </nav>
      {children}
    </div>
  );
}

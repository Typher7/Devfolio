import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import Particles from "../components/Particles";
import { SparklesIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-linear-to-br from-slate-900 to-slate-800 flex items-center justify-center">
      {/* Particles Background */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={150}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <SparklesIcon className="h-12 w-12 text-indigo-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">Sign in to continue to DevFolio</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-8">
          <LoginForm />

          {/* Divider */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <p className="text-center text-slate-400 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-8">
          © 2025 DevFolio. All rights reserved.
        </p>
      </div>
    </div>
  );
}

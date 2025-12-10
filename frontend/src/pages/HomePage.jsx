import React from "react";
import { Link } from "react-router-dom";
import {
  FolderIcon,
  PencilSquareIcon,
  TrophyIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import {
  FiZap,
  FiSmartphone,
  FiShare2,
  FiLock,
  FiTrendingUp,
  FiCode,
} from "react-icons/fi";
import Particles from "../components/Particles";
import GradientText from "../components/GradientText";

export default function HomePage() {
  return (
    <div className="relative bg-linear-to-br from-slate-900 to-slate-800">
      {/* Particles Background for entire page */}
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
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden text-white min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center w-full relative z-10">
          <div className="mb-6 inline-flex items-center rounded-full bg-indigo-500/10 px-4 py-2 ring-1 ring-indigo-500/20">
            <SparklesIcon className="h-4 w-4 text-indigo-400 mr-2" />
            <span className="text-sm text-indigo-300">
              Build your professional portfolio today
            </span>
          </div>

          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={300}
            showBorder={false}
            className="custom-class"
          >
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6">
              Showcase Your Work,
              <br />
              <span>Inspire the World</span>
            </h1>
          </GradientText>

          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto text-slate-300">
            Create a stunning portfolio to showcase your projects, share your
            insights, and highlight your achievements all in one beautiful
            place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              Get Started Free
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white hover:text-slate-900 transition-all"
            >
              View Portfolio Examples
            </Link>
          </div>

          {/* Feature Icons - Below CTA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-20 border-t border-white/10">
            <div className="text-center">
              <div className="mx-auto mb-4 inline-flex items-center justify-center h-14 w-14 rounded-full bg-indigo-500/10 ring-1 ring-indigo-500/20">
                <FolderIcon className="h-7 w-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Project Showcase
              </h3>
              <p className="text-slate-400">
                Display your projects with rich descriptions, images, and direct
                links to live demos
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 inline-flex items-center justify-center h-14 w-14 rounded-full bg-indigo-500/10 ring-1 ring-indigo-500/20">
                <PencilSquareIcon className="h-7 w-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Blog Platform
              </h3>
              <p className="text-slate-400">
                Share your knowledge, document your journey, and engage with
                your audience
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 inline-flex items-center justify-center h-14 w-14 rounded-full bg-indigo-500/10 ring-1 ring-indigo-500/20">
                <TrophyIcon className="h-7 w-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Awards & Badges
              </h3>
              <p className="text-slate-400">
                Highlight your achievements, certifications, and professional
                milestones
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="relative py-20 z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Build Your Portfolio?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join developers and creators who are showcasing their work and
            connecting with opportunities
          </p>
          <Link
            to="/register"
            className="inline-flex items-center rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:from-blue-700 hover:to-indigo-700"
          >
            Create Your Portfolio
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>

      {/* Why DevFolio Section */}
      <div className="relative py-24 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose DevFolio?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Everything you need to build and share your professional portfolio
              in one elegant platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group relative rounded-xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm p-8 hover:shadow-xl hover:border-indigo-500 transition-all duration-300">
              <div className="mb-6 inline-flex items-center justify-center h-14 w-14 rounded-lg bg-linear-to-br from-blue-500/20 to-indigo-500/20 ring-1 ring-indigo-500/30 group-hover:ring-indigo-400 transition-all">
                <FiCode className="h-7 w-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Beautiful Templates
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Professional, modern designs that make your work stand out
                without requiring any design skills
              </p>
            </div>

            {/* Card 2 */}
            <div className="group relative rounded-xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm p-8 hover:shadow-xl hover:border-indigo-500 transition-all duration-300">
              <div className="mb-6 inline-flex items-center justify-center h-14 w-14 rounded-lg bg-linear-to-br from-blue-500/20 to-indigo-500/20 ring-1 ring-indigo-500/30 group-hover:ring-indigo-400 transition-all">
                <FiSmartphone className="h-7 w-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Fully Responsive
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Your portfolio looks stunning on all devices, from desktop
                screens to mobile phones
              </p>
            </div>

            {/* Card 3 */}
            <div className="group relative rounded-xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm p-8 hover:shadow-xl hover:border-indigo-500 transition-all duration-300">
              <div className="mb-6 inline-flex items-center justify-center h-14 w-14 rounded-lg bg-linear-to-br from-blue-500/20 to-indigo-500/20 ring-1 ring-indigo-500/30 group-hover:ring-indigo-400 transition-all">
                <FiZap className="h-7 w-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Lightning Fast
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Optimized for speed and performance ensuring your portfolio
                loads instantly every time
              </p>
            </div>

            {/* Card 4 */}
            <div className="group relative rounded-xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm p-8 hover:shadow-xl hover:border-indigo-500 transition-all duration-300">
              <div className="mb-6 inline-flex items-center justify-center h-14 w-14 rounded-lg bg-linear-to-br from-blue-500/20 to-indigo-500/20 ring-1 ring-indigo-500/30 group-hover:ring-indigo-400 transition-all">
                <FiShare2 className="h-7 w-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Easy Sharing
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Share your portfolio with a unique public URL to employers,
                clients, and your community
              </p>
            </div>

            {/* Card 5 */}
            <div className="group relative rounded-xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm p-8 hover:shadow-xl hover:border-indigo-500 transition-all duration-300">
              <div className="mb-6 inline-flex items-center justify-center h-14 w-14 rounded-lg bg-linear-to-br from-blue-500/20 to-indigo-500/20 ring-1 ring-indigo-500/30 group-hover:ring-indigo-400 transition-all">
                <FiLock className="h-7 w-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Privacy Control
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Full control over your content with powerful privacy settings
                and draft management
              </p>
            </div>

            {/* Card 6 */}
            <div className="group relative rounded-xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm p-8 hover:shadow-xl hover:border-indigo-500 transition-all duration-300">
              <div className="mb-6 inline-flex items-center justify-center h-14 w-14 rounded-lg bg-linear-to-br from-blue-500/20 to-indigo-500/20 ring-1 ring-indigo-500/30 group-hover:ring-indigo-400 transition-all">
                <FiTrendingUp className="h-7 w-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Showcase Growth
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Display projects, blog insights, and achievements to demonstrate
                your professional growth
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative bg-slate-900 text-slate-300 py-16 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div>
              <h3 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-3">
                DevFolio
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Build a stunning portfolio and showcase your work to the world.
                Your professional presence starts here.
              </p>
            </div>

            {/* Product Column */}
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/projects"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    View Projects
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Read Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>

            {/* Features Column */}
            <div>
              <h4 className="text-white font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#portfolio"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Portfolio Builder
                  </a>
                </li>
                <li>
                  <a
                    href="#blog"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Blog Platform
                  </a>
                </li>
                <li>
                  <a
                    href="#awards"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Awards & Badges
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect Column */}
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#twitter"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#github"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="#linkedin"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm">
                © {new Date().getFullYear()} DevFolio. All rights reserved.
              </p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a
                  href="#privacy"
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#terms"
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

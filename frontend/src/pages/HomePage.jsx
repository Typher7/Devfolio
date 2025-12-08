import React from "react";
import { Link } from "react-router-dom";
import { FolderIcon, PencilSquareIcon, TrophyIcon } from "@heroicons/react/24/outline";
import FloatingLines from "../components/FloatingLines";

export default function HomePage() {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <FloatingLines
        className="absolute inset-0 -z-10 opacity-25"
        linesGradient={["#93c5fd", "#a5b4fc", "#67e8f9"]}
        enabledWaves={["top", "middle", "bottom"]}
        lineCount={6}
        lineDistance={5}
        animationSpeed={0.8}
        interactive={true}
        parallax={true}
        parallaxStrength={0.2}
        mixBlendMode="screen"
      />
      <div className="max-w-7xl mx-auto px-6 py-28 text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-4">Welcome to DevFolio</h1>
        <p className="text-lg md:text-xl mb-10 opacity-95">
          Showcase your projects, share your insights, and build your
          professional portfolio
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/projects"
            className="inline-flex items-center rounded-md bg-white text-indigo-700 px-8 py-3 text-sm font-semibold shadow-sm hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
          >
            View Projects
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center rounded-md border-2 border-white px-8 py-3 text-sm font-semibold hover:bg-white hover:text-indigo-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
          >
            Read Blog
          </Link>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <FolderIcon className="mx-auto h-12 w-12 text-indigo-400 mb-3" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-white mb-2">Project Showcase</h3>
              <p className="text-slate-300">
                Display all your projects with descriptions, images, and links
              </p>
            </div>
            <div className="text-center">
              <PencilSquareIcon className="mx-auto h-12 w-12 text-indigo-400 mb-3" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-white mb-2">Blog Platform</h3>
              <p className="text-slate-300">
                Share your knowledge and insights with the community
              </p>
            </div>
            <div className="text-center">
              <TrophyIcon className="mx-auto h-12 w-12 text-indigo-400 mb-3" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-white mb-2">Awards & Badges</h3>
              <p className="text-slate-300">
                Highlight achievements and certifications
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosInstance";
import ProjectCard from "../components/ProjectCard";
import BlogCard from "../components/BlogCard";

export default function PublicPortfolio() {
  const { handle } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPortfolio();
  }, [handle]);

  const fetchPortfolio = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/public/${handle}`);
      setPortfolio(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Portfolio not found");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!portfolio)
    return <div className="text-center py-10">Portfolio not found</div>;

  const { profile, projects, posts, awards } = portfolio;

  return (
    <div>
      {/* Hero Section with Background Image */}
      <div className="relative bg-gray-900 text-white py-30 overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1744627549992-cd7a5f157344?q=80&w=1181&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-blue-900/80 to-indigo-900/80" />

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-4 flex items-center gap-8">
          {profile.avatar_url && (
            <img
              src={profile.avatar_url}
              alt={profile.full_name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl ring-4 ring-white/20"
            />
          )}
          <div>
            <h1 className="text-5xl font-bold mb-2 drop-shadow-lg">
              {profile.full_name}
            </h1>
            {profile.tagline && (
              <p className="text-2xl opacity-95 mb-2 drop-shadow">
                {profile.tagline}
              </p>
            )}
            {profile.bio && (
              <p className="text-lg opacity-90 max-w-2xl drop-shadow">
                {profile.bio}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Projects Section */}
      {projects.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                detailPath={(id) => `/portfolio/${handle}/projects/${id}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Blog Section */}
      {posts.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 py-16 border-t">
          <h2 className="text-3xl font-bold mb-8">Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                detailPath={(id) => `/portfolio/${handle}/blog/${id}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Awards Section */}
      {awards.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 py-16 border-t">
          <h2 className="text-3xl font-bold mb-8">Awards & Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award) => (
              <div
                key={award.id}
                className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-amber-200"
              >
                {/* Badge Container */}
                <div className="relative h-48 bg-linear-to-br from-amber-50 to-orange-50 flex items-center justify-center overflow-hidden">
                  {award.badge_url ? (
                    <img
                      src={award.badge_url}
                      alt={award.title}
                      className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <svg
                      className="w-24 h-24 text-amber-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                    </svg>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                    {award.title}
                  </h3>
                  {award.description && (
                    <p className="text-gray-600 text-sm text-center line-clamp-2">
                      {award.description}
                    </p>
                  )}
                  <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                    <span className="inline-flex items-center rounded-full bg-amber-50 text-amber-700 px-3 py-1 text-xs font-semibold ring-1 ring-amber-200">
                      ⭐ Achievement
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {projects.length === 0 && posts.length === 0 && awards.length === 0 && (
        <div className="max-w-6xl mx-auto px-4 py-16 text-center text-gray-600">
          <p>This portfolio is currently empty. Check back soon!</p>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About Section */}
            <div>
              <h3 className="text-xl font-bold mb-4 bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                DevFolio
              </h3>
              <p className="text-gray-400 text-sm">
                Showcase your work and achievements with a beautiful portfolio.
                Built for developers, designers, and creators.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/" className="hover:text-white transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/login" className="hover:text-white transition">
                    Login
                  </a>
                </li>
                <li>
                  <a href="/register" className="hover:text-white transition">
                    Create Portfolio
                  </a>
                </li>
              </ul>
            </div>

            {/* Portfolio Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Portfolio</h3>
              <p className="text-gray-400 text-sm mb-2">{profile.full_name}</p>
              {profile.tagline && (
                <p className="text-gray-500 text-sm italic">
                  {profile.tagline}
                </p>
              )}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} DevFolio. Built with ❤️ for creators.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

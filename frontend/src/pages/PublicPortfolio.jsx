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
      <div className="relative bg-gray-900 text-white py-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80" />

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
              <ProjectCard key={project.id} project={project} />
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
              <BlogCard key={post.id} post={post} />
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
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
              >
                {award.badge_url && (
                  <img
                    src={award.badge_url}
                    alt={award.title}
                    className="w-20 h-20 mx-auto mb-4 object-contain"
                  />
                )}
                <h3 className="text-lg font-bold mb-2">{award.title}</h3>
                {award.description && (
                  <p className="text-gray-600">{award.description}</p>
                )}
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
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
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

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
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-8">
          {profile.avatar_url && (
            <img
              src={profile.avatar_url}
              alt={profile.full_name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold">{profile.full_name}</h1>
            {profile.tagline && (
              <p className="text-xl opacity-90">{profile.tagline}</p>
            )}
            {profile.bio && <p className="mt-2 opacity-85">{profile.bio}</p>}
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
    </div>
  );
}

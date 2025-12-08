import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api/axiosInstance";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useSelector((s) => s.auth);

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/projects/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error("Failed to fetch project", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  // Only show published projects or redirect
  if (!project || !project.is_published) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-gray-600">Project not found or is not published.</p>
        <button
          onClick={() => navigate("/projects")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  const tags =
    typeof project.tags === "string"
      ? project.tags.split(",")
      : project.tags || [];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <button
        onClick={() => navigate("/projects")}
        className="mb-6 text-blue-600 hover:underline"
      >
        ← Back to Projects
      </button>

      {project.image_url && (
        <img
          src={project.image_url}
          alt={project.title}
          className="w-full h-96 object-cover rounded-lg mb-8 shadow-lg"
        />
      )}

      <article>
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        <p className="text-gray-500 mb-6">
          Created on {new Date(project.created_at).toLocaleDateString()}
        </p>

        <div className="prose prose-lg max-w-none mb-8">
          {project.description}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-4 mt-8">
          {project.repo_url && (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
            >
              View Repository
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              View Live
            </a>
          )}
        </div>
      </article>
    </div>
  );
}

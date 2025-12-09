import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProjectCard from "../components/ProjectCard";
import api from "../api/axiosInstance";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthenticated, user } = useSelector((s) => s.auth);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const endpoint = isAuthenticated ? "/projects/mine" : "/projects";
        console.debug("Fetching projects from", endpoint, "user:", user?.id);
        const response = await api.get(endpoint);
        console.debug("Projects response length:", response.data?.length);
        setProjects(response.data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [isAuthenticated, user?.id]);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold tracking-tight mb-10">Projects</h1>
        <div className="text-center py-10">
          <p className="text-lg text-gray-600 mb-4">
            Please log in to view projects.
          </p>
          <a
            href="/login"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Log In
          </a>
        </div>
      </div>
    );
  }

  // Filter to only show published projects
  const publishedProjects = projects.filter((p) => p.is_published);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-10">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publishedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {publishedProjects.length === 0 && (
        <p className="text-center text-gray-600">No published projects yet.</p>
      )}
    </div>
  );
}

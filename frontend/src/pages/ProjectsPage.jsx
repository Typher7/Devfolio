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

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-10">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

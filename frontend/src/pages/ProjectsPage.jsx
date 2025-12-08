import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import api from "../api/axiosInstance";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

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

import React from "react";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <div className="group bg-white rounded-lg shadow-sm ring-1 ring-gray-200 hover:shadow-md hover:ring-gray-300 transition p-6">
      {project.image_url && (
        <img
          src={project.image_url}
          alt={project.title}
          className="w-full h-48 object-cover rounded-md mb-4 shadow-sm"
        />
      )}
      <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-700 transition-colors">
        {project.title}
      </h3>
      <p className="text-gray-600 mb-4">{project.description}</p>

      {project.tags && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.split(",").map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 px-2.5 py-1 text-xs font-medium ring-1 ring-indigo-200"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Link
          to={`/projects/${project.id}`}
          className="text-indigo-700 hover:underline font-medium"
        >
          View Details
        </Link>
        {project.repo_url && (
          <a
            href={project.repo_url}
            className="text-indigo-700 hover:underline font-medium"
            target="_blank"
            rel="noreferrer"
          >
            Repository
          </a>
        )}
        {project.live_url && (
          <a
            href={project.live_url}
            className="text-indigo-700 hover:underline font-medium"
            target="_blank"
            rel="noreferrer"
          >
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}

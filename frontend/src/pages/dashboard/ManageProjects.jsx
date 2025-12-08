import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/axiosInstance";
import { setProjects } from "../../redux/slices/projectsSlice";

export default function ManageProjects() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    repo_url: "",
    live_url: "",
    image_url: "",
    is_published: false,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects");
      dispatch(setProjects(response.data));
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, formData);
      } else {
        await api.post("/projects", formData);
      }
      await fetchProjects();
      resetForm();
    } catch (error) {
      console.error("Error saving project", error);
    }
  };

  const handleEdit = (project) => {
    setFormData(project);
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await api.delete(`/projects/${id}`);
        await fetchProjects();
      } catch (error) {
        console.error("Error deleting project", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      tags: "",
      repo_url: "",
      live_url: "",
      image_url: "",
      is_published: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "New Project"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow mb-8"
        >
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Edit" : "Create"} Project
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Tags</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="React, Node.js"
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 h-24"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Repository URL</label>
              <input
                type="url"
                name="repo_url"
                value={formData.repo_url}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Live URL</label>
              <input
                type="url"
                name="live_url"
                value={formData.live_url}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_published"
                checked={formData.is_published}
                onChange={handleChange}
                className="mr-2"
              />
              <span>Publish</span>
            </label>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {editingId ? "Update" : "Create"} Project
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-4 rounded-lg shadow">
            {project.image_url && (
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-32 object-cover rounded mb-2"
              />
            )}
            <h3 className="text-lg font-bold">{project.title}</h3>
            <p className="text-gray-600 text-sm mb-2">
              {project.description.substring(0, 100)}...
            </p>
            <div className="flex gap-2 mb-2">
              <span
                className={`text-xs px-2 py-1 rounded ${
                  project.is_published
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {project.is_published ? "Published" : "Draft"}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(project)}
                className="text-blue-600 hover:underline text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="text-red-600 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

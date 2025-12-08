import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/axiosInstance";
import { setAwards } from "../../redux/slices/awardsSlice";

export default function ManageAwards() {
  const dispatch = useDispatch();
  const awards = useSelector((state) => state.awards.awards);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    badge_url: "",
    is_published: false,
  });

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    try {
      const response = await api.get("/awards");
      dispatch(setAwards(response.data));
    } catch (error) {
      console.error("Failed to fetch awards", error);
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
        await api.put(`/awards/${editingId}`, formData);
      } else {
        await api.post("/awards", formData);
      }
      await fetchAwards();
      resetForm();
    } catch (error) {
      console.error("Error saving award", error);
    }
  };

  const handleEdit = (award) => {
    setFormData(award);
    setEditingId(award.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await api.delete(`/awards/${id}`);
        await fetchAwards();
      } catch (error) {
        console.error("Error deleting award", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      badge_url: "",
      is_published: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Awards & Badges</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "New Award"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow mb-8"
        >
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Edit" : "Create"} Award
          </h2>

          <div className="mb-4">
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

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 h-24"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Badge Image URL</label>
            <input
              type="url"
              name="badge_url"
              value={formData.badge_url}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
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
            {editingId ? "Update" : "Create"} Award
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {awards.map((award) => (
          <div
            key={award.id}
            className="bg-white p-4 rounded-lg shadow text-center"
          >
            {award.badge_url && (
              <img
                src={award.badge_url}
                alt={award.title}
                className="w-20 h-20 mx-auto mb-2 object-contain"
              />
            )}
            <h3 className="font-bold">{award.title}</h3>
            {award.description && (
              <p className="text-gray-600 text-sm mb-2">{award.description}</p>
            )}
            <div className="flex justify-center gap-2 mb-2">
              <span
                className={`text-xs px-2 py-1 rounded ${
                  award.is_published
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {award.is_published ? "Published" : "Draft"}
              </span>
            </div>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => handleEdit(award)}
                className="text-blue-600 hover:underline text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(award.id)}
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

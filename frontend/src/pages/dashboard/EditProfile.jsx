import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/axiosInstance";
import { setUser } from "../../redux/slices/authSlice";

export default function EditProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    full_name: "",
    tagline: "",
    bio: "",
    avatar_url: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile");
      setFormData({
        full_name: response.data.full_name || "",
        tagline: response.data.tagline || "",
        bio: response.data.bio || "",
        avatar_url: response.data.avatar_url || "",
      });
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.put("/profile", formData);
      dispatch(setUser({ ...user, ...formData }));
      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(
        "Error updating profile: " +
          (error.response?.data?.error || error.message)
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

      {message && (
        <div
          className={`p-4 rounded mb-4 ${
            message.includes("Error")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Tagline</label>
          <input
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            placeholder="e.g., Full-stack developer & designer"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 h-32"
            placeholder="Tell the world about yourself..."
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">
            Avatar URL
          </label>
          <input
            type="url"
            name="avatar_url"
            value={formData.avatar_url}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {formData.avatar_url && (
            <img
              src={formData.avatar_url}
              alt="Avatar preview"
              className="w-20 h-20 rounded-full mt-2"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}

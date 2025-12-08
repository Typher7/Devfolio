import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/axiosInstance";
import { setPosts } from "../../redux/slices/postsSlice";

export default function ManagePosts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    image_url: "",
    is_published: false,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get("/posts");
      dispatch(setPosts(response.data));
    } catch (error) {
      console.error("Failed to fetch posts", error);
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
        await api.put(`/posts/${editingId}`, formData);
      } else {
        await api.post("/posts", formData);
      }
      await fetchPosts();
      resetForm();
    } catch (error) {
      console.error("Error saving post", error);
    }
  };

  const handleEdit = (post) => {
    setFormData(post);
    setEditingId(post.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await api.delete(`/posts/${id}`);
        await fetchPosts();
      } catch (error) {
        console.error("Error deleting post", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      image_url: "",
      is_published: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "New Post"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow mb-8"
        >
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Edit" : "Create"} Post
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
            <label className="block text-gray-700 mb-2">Excerpt</label>
            <input
              type="text"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Brief summary (shown in lists)"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 h-40"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Featured Image URL
            </label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
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
            {editingId ? "Update" : "Create"} Post
          </button>
        </form>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {post.excerpt || post.content.substring(0, 100)}...
                </p>
                <div className="flex gap-2 items-center">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      post.is_published
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {post.is_published ? "Published" : "Draft"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

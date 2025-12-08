import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api/axiosInstance";

export default function BlogPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useSelector((s) => s.auth);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Failed to fetch post", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  // Only show published posts or redirect
  if (!post || !post.is_published) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-gray-600">Post not found or is not published.</p>
        <button
          onClick={() => navigate("/blog")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <button
        onClick={() => navigate("/blog")}
        className="mb-6 text-blue-600 hover:underline"
      >
        ← Back to Blog
      </button>

      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg mb-8 shadow-lg"
        />
      )}

      <article>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 mb-6">
          Published on {new Date(post.created_at).toLocaleDateString()}
        </p>

        <div className="prose prose-lg max-w-none mb-8">{post.content}</div>
      </article>
    </div>
  );
}

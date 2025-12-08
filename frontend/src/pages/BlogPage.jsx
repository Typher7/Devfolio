import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BlogCard from "../components/BlogCard";
import api from "../api/axiosInstance";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthenticated, user } = useSelector((s) => s.auth);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const endpoint = isAuthenticated ? "/posts/mine" : "/posts";
        console.debug("Fetching posts from", endpoint, "user:", user?.id);
        const response = await api.get(endpoint);
        console.debug("Posts response length:", response.data?.length);
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [isAuthenticated, user?.id]);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-10">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

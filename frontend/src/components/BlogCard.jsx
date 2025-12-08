import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({ post }) {
  const excerpt = post.excerpt || post.content.substring(0, 150) + "...";

  return (
    <div className="group bg-white rounded-lg shadow-sm ring-1 ring-gray-200 hover:shadow-md hover:ring-gray-300 transition p-6">
      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-48 object-cover rounded-md mb-4 shadow-sm"
        />
      )}
      <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-700 transition-colors">{post.title}</h3>
      <p className="text-gray-600 mb-4">{excerpt}</p>
      <p className="text-sm text-gray-500 mb-4">
        {new Date(post.created_at).toLocaleDateString()}
      </p>
      <Link to={`/blog/${post.id}`} className="text-indigo-700 hover:underline font-medium">
        Read More →
      </Link>
    </div>
  );
}

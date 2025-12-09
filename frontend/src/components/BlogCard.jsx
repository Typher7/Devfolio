import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({ post, detailPath }) {
  // Default to /blog/:id if no custom path provided
  const linkPath = detailPath ? detailPath(post.id) : `/blog/${post.id}`;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200">
      {/* Image Container */}
      <div className="relative h-56 bg-linear-to-br from-gray-200 to-gray-300 overflow-hidden">
        {post.image_url ? (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-purple-100 to-pink-100">
            <svg
              className="w-12 h-12 text-purple-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2v-5.293a2 2 0 012-2h2.971L9 10m0 0H5m15 0h-3.5"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-6">
        {/* Date Badge */}
        <div className="inline-flex items-center rounded-full bg-purple-50 text-purple-700 px-3 py-1 text-xs font-semibold ring-1 ring-purple-200 mb-3">
          📅 {formatDate(post.created_at)}
        </div>

        <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt || post.content?.substring(0, 100) + "..."}
        </p>

        {/* Read More Button */}
        <div className="pt-4 border-t border-gray-100">
          <Link
            to={linkPath}
            className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold text-sm group/btn"
          >
            Read More
            <svg
              className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

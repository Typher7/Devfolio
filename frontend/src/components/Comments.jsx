import React, { useState, useEffect } from "react";
import api from "../api/axiosInstance";
import { useSelector } from "react-redux";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Comments({ type = "post", itemId, className = "" }) {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [commentCount, setCommentCount] = useState(0);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const endpoint =
          type === "post" ? `/post/${itemId}` : `/project/${itemId}`;
        const res = await api.get(`/comments${endpoint}`);
        setComments(res.data);
        setCommentCount(res.data.length);
      } catch (err) {
        console.error("Failed to load comments:", err);
      }
    };

    if (itemId) {
      fetchComments();
    }
  }, [itemId, type]);

  // Submit comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const endpoint =
        type === "post" ? `/post/${itemId}` : `/project/${itemId}`;
      const res = await api.post(`/comments${endpoint}`, {
        content: newComment,
      });
      setComments([res.data, ...comments]);
      setNewComment("");
      setCommentCount(commentCount + 1);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to post comment");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter((c) => c.id !== commentId));
      setCommentCount(commentCount - 1);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete comment");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

    return date.toLocaleDateString();
  };

  return (
    <div className={`bg-white rounded-lg p-6 ${className}`}>
      {/* Comments Header */}
      <div className="flex items-center gap-2 mb-6">
        <ChatBubbleLeftIcon className="h-5 w-5 text-slate-600" />
        <h3 className="text-lg font-semibold text-slate-900">
          Comments ({commentCount})
        </h3>
      </div>

      {/* Comment Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmitComment} className="mb-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            maxLength={500}
            className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            rows="3"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-slate-500">
              {newComment.length}/500
            </span>
            <button
              type="submit"
              disabled={!newComment.trim() || isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              {isLoading ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6 text-center">
          <p className="text-slate-600 text-sm">
            <a
              href="/login"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Sign in
            </a>{" "}
            to leave a comment
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-center text-slate-500 py-8">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {comment.avatar_url ? (
                    <img
                      src={comment.avatar_url}
                      alt={comment.full_name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-xs font-semibold text-indigo-600">
                        {comment.full_name[0]}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-slate-900 text-sm">
                      {comment.full_name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatDate(comment.created_at)}
                    </p>
                  </div>
                </div>
                {isAuthenticated && user?.id === comment.user_id && (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-slate-400 hover:text-red-600 transition-colors p-1"
                    title="Delete comment"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
              <p className="text-slate-700 text-sm overflow-wrap-break-word">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

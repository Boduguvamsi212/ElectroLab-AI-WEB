import React, { useState, useEffect } from "react";
import { FaUserCircle, FaPaperPlane } from "react-icons/fa";
import apiService from "../api/apiService";

function DiscussionScreen() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  // Load active user details from local storage or defaults
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : { name: "Dr. Alex Carter", role: "Senior Chemist" };

  const loadData = async () => {
    try {
      const data = await apiService.getDiscussion();
      setComments(data);
    } catch (err) {
      console.error("Failed to load discussions feed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await apiService.postDiscussion({
        sender: user.name,
        role: user.role,
        content: newComment
      });
      setNewComment("");
      loadData(); // reload feed
    } catch (err) {
      console.error("Failed to post message", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-cyan-400">
        <span className="animate-spin text-2xl mr-2">⚛</span> Loading Operator Feed...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Intro info */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-bold mb-2 text-gradient-cyan-purple">Lab Operator Discussion Board</h3>
        <p className="text-indigo-200 text-sm">
          Discuss polarization curves anomalies, cell configurations, and alloy sample behavior in real-time.
        </p>
      </div>

      {/* Discussion feed */}
      <div className="glass-panel p-6 space-y-6">
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 sidebar-scroll">
          {comments.map((c) => {
            const formattedTime = new Date(c.timestamp).toLocaleTimeString("en-US", {
              hour: '2-digit', minute: '2-digit'
            }) + " - " + new Date(c.timestamp).toLocaleDateString("en-US", {
              month: 'short', day: 'numeric'
            });
            return (
              <div key={c.id} className="flex gap-3.5 p-3.5 bg-white/5 border border-white/5 rounded-xl text-sm">
                <FaUserCircle className="text-4xl text-indigo-300 flex-shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white">{c.sender}</span>
                    <span className="text-[10px] text-indigo-300/40 font-mono">({c.role})</span>
                    <span className="text-[10px] text-indigo-300/30 font-mono">| {formattedTime}</span>
                  </div>
                  <p className="text-indigo-200">{c.content}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input box */}
        <form onSubmit={handlePost} className="flex gap-2">
          <input
            type="text"
            placeholder="Add comments about active experiment sweep..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 bg-black/25 border border-cyan-400/20 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
          />
          <button type="submit" className="p-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors">
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
}

export default DiscussionScreen;


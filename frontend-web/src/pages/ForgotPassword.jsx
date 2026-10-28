import React from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    alert("Password reset instructions sent to your email!");
    navigate("/login");
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-[#091336] via-[#0e1e5b] to-[#1e1145] flex justify-center items-center p-4">
      <div className="w-full max-w-[400px] glass-panel p-8 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black tracking-wide text-gradient-cyan-purple">Reset Password</h2>
          <p className="text-xs text-indigo-300">Enter your research credentials email below.</p>
        </div>

        <form onSubmit={handleReset} className="space-y-4 text-sm">
          <div>
            <label className="text-xs text-indigo-300 block mb-1">Email Address</label>
            <input
              type="email"
              placeholder="e.g. alex.carter@institute.edu"
              required
              className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white placeholder-indigo-300/40"
            />
          </div>

          <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded font-bold hover:opacity-95 transition-opacity">
            Send Reset Instructions
          </button>
        </form>

        <div className="text-center">
          <button onClick={() => navigate("/login")} className="text-xs text-cyan-400 hover:underline">
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
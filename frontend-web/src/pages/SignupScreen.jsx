import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../api/apiService";

function SignupScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Researcher");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await apiService.signup(email, password, name, role);
      setSuccess("Account successfully registered! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-[#091336] via-[#0e1e5b] to-[#1e1145] flex justify-center items-center p-4">
      <div className="w-full max-w-[400px] glass-panel p-8 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-3xl animate-float block">⚛</span>
          <h2 className="text-2xl font-black tracking-wide text-gradient-cyan-purple">Create Account</h2>
          <p className="text-xs text-indigo-300">Register research station credentials.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-300 text-xs p-3 rounded text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-300 text-xs p-3 rounded text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4 text-sm">
          <div>
            <label className="text-xs text-indigo-300 block mb-1">Researcher Full Name</label>
            <input
              type="text"
              placeholder="e.g. Dr. Alex Carter"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white placeholder-indigo-300/40 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-xs text-indigo-300 block mb-1">Academic / Corporate Email</label>
            <input
              type="email"
              placeholder="e.g. alex@corrosion.lab"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white placeholder-indigo-300/40 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-xs text-indigo-300 block mb-1">Academic Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="Senior Chemist">Senior Chemist</option>
              <option value="Researcher">Researcher</option>
              <option value="Lab Manager">Lab Manager</option>
              <option value="Research Associate">Research Associate</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-indigo-300 block mb-1">Create Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white placeholder-indigo-300/40 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded font-bold hover:opacity-95 transition-opacity disabled:opacity-50 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
          >
            {loading ? "Registering..." : "Register Station"}
          </button>
        </form>

        <div className="text-center pt-2">
          <button onClick={() => navigate("/login")} className="text-xs text-indigo-300 hover:text-white transition-colors">
            Already have an account? <span className="text-cyan-400 font-semibold hover:underline">Log In</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupScreen;
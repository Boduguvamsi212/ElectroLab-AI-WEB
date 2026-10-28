import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";
import apiService from "../api/apiService";

function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fillCredentials = (userEmail, userPassword) => {
    setEmail(userEmail);
    setPassword(userPassword);
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiService.login(email.trim(), password.trim());
      navigate("/success");
    } catch (err) {
      setError(err.message || "Invalid credentials. Try alex@corrosion.lab / password123");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-[#091336] via-[#0e1e5b] to-[#1e1145] flex justify-center items-center p-4">
      <div className="w-full max-w-[420px] glass-panel p-8 space-y-5">
        <div className="text-center space-y-1">
          <span className="text-3xl animate-float block">⚛</span>
          <h2 className="text-2xl font-black tracking-wide text-gradient-cyan-purple">ElectroLab AI</h2>
          <p className="text-xs text-indigo-300">Workstation Login Portal</p>
        </div>

        {error && (
          <div className="bg-red-500/15 border border-red-500/40 text-red-200 text-xs p-3 rounded-lg text-center leading-relaxed">
            {error}
          </div>
        )}

        {/* Demo / Saved Accounts Quick Login */}
        <div className="bg-[#121c45]/70 border border-cyan-500/20 rounded-xl p-3 space-y-2">
          <div className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <FaUserCircle className="text-sm" /> Quick Fill Saved Accounts:
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => fillCredentials("alex@corrosion.lab", "password123")}
              className="px-2.5 py-1.5 bg-cyan-950/60 hover:bg-cyan-800/50 border border-cyan-500/30 text-cyan-300 rounded-lg text-left transition-colors truncate"
              title="Dr. Alex Carter (alex@corrosion.lab)"
            >
              <span className="font-bold block truncate">Dr. Alex Carter</span>
              <span className="text-[10px] text-indigo-300">alex@corrosion.lab</span>
            </button>
            <button
              type="button"
              onClick={() => fillCredentials("buntyvamsi68@gmail.com", "1234")}
              className="px-2.5 py-1.5 bg-purple-950/60 hover:bg-purple-800/50 border border-purple-500/30 text-purple-200 rounded-lg text-left transition-colors truncate"
              title="Bodugu Vamsi (buntyvamsi68@gmail.com)"
            >
              <span className="font-bold block truncate">Bodugu Vamsi</span>
              <span className="text-[10px] text-indigo-300">buntyvamsi68@...</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-sm">
          <div>
            <label className="text-xs text-indigo-300 block mb-1">Researcher Email</label>
            <input
              type="email"
              placeholder="e.g. alex@corrosion.lab"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded-lg p-2.5 text-white placeholder-indigo-300/40 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-xs text-indigo-300 block mb-1">Secure Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded-lg p-2.5 pr-10 text-white placeholder-indigo-300/40 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-300 hover:text-cyan-400 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() => navigate("/forgot")}
              className="text-xs text-cyan-400 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-bold hover:opacity-95 transition-opacity disabled:opacity-50 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
          >
            {loading ? "Verifying..." : "Log In"}
          </button>
        </form>

        <div className="text-center pt-1">
          <button onClick={() => navigate("/signup")} className="text-xs text-indigo-300 hover:text-white transition-colors">
            Don't have a license account? <span className="text-cyan-400 font-semibold hover:underline">Sign Up</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaBell, FaUserCircle, FaCircle } from "react-icons/fa";
import apiService from "../api/apiService";

function Navbar({ onToggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    const syncUser = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("user") || "{}");
        if (stored && stored.name) {
          setUser(stored);
        }
      } catch {
        // ignore
      }
    };

    syncUser();

    // Fetch latest profile from backend if token exists
    if (localStorage.getItem("token")) {
      apiService.getProfile().then((data) => {
        if (data && data.name) {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        }
      }).catch(() => {});
    }

    window.addEventListener("storage", syncUser);
    window.addEventListener("user-updated", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("user-updated", syncUser);
    };
  }, [location.pathname]);

  // Map paths to descriptive screen titles
  const getScreenTitle = (path) => {
    switch (path) {
      case "/": return "Splash Screen";
      case "/welcome": return "Welcome Screen";
      case "/login": return "Login";
      case "/signup": return "Sign Up";
      case "/forgot": return "Forgot Password";
      case "/success": return "Authentication Success";
      case "/dashboard": return "Dashboard Home";
      case "/measurement": return "Measurement Settings";
      case "/graph": return "Tafel Curve Analysis";
      case "/prediction": return "AI Electrochemical Predictions";
      case "/comparison": return "Methodology Comparison";
      case "/history": return "Experiment Records";
      case "/device-monitoring": return "Potentiostat Live Feeds";
      case "/reports": return "Reports Generator";
      case "/alerts": return "Safety Alerts & Thresholds";
      case "/profile": return "Researcher Profile";
      case "/settings": return "Application Preferences";
      case "/ai-insights": return "AI Predictive Insights";
      case "/final-result": return "Final Analysis Report";
      case "/materials": return "Alloy Material Database";
      case "/environment": return "Environmental Controls";
      case "/batch-processing": return "High-Throughput Batch Processing";
      case "/techniques": return "Electrochemical Testing Methods";
      case "/visualization": return "Custom Data Visualization Studio";
      case "/statistics": return "Statistical Distribution Analysis";
      case "/data-export": return "Secure Data Export";
      case "/data-import": return "Laboratory File Import";
      case "/archive": return "Archive Management";
      case "/storage-analytics": return "Storage & Row Analytics";
      case "/data-cleanup": return "Signal Noise Filter Cleanup";
      case "/backup": return "Backup & Cloud Recovery";
      case "/calibration": return "Electrode Calibration Management";
      case "/diagnostics": return "Hardware Channel Diagnostics";
      case "/team": return "Lab Team Collaboration";
      case "/projects": return "Collaborative Workspaces";
      case "/discussion": return "Operator Discussion Board";
      case "/video-call": return "Remote Videoconference";
      case "/knowledge-base": return "Electrochemical Knowledge Base";
      case "/training": return "Interactive Lab Training";
      case "/tutorials": return "Video Walkthrough Guides";
      case "/help-center": return "Technical Support Center";
      case "/security": return "System Security & IAM";
      case "/quality-control": return "ASTM Quality Validation";
      case "/audit-trail": return "System Activity Audit Log";
      case "/api-integration": return "REST/Webhooks API Integrations";
      case "/workflow": return "Automated Lab Workflows";
      case "/calculator": return "Faraday Corrosion Calculator";
      case "/model-comparison": return "Machine Learning Model Benchmark";
      case "/custom-parameters": return "Custom Testing Parameters";
      case "/performance": return "App Performance Metrics";
      case "/global-settings": return "Global Station Configuration";
      default: return "AI Electrochemical Workstation";
    }
  };

  return (
    <header className="h-[76px] bg-[#07102e]/60 backdrop-blur-md border-b border-cyan-400/10 px-4 lg:px-6 flex items-center justify-between z-30 select-none">
      {/* Left side: Hamburger (mobile) + Dynamic Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-indigo-300 hover:text-cyan-400 transition-colors"
          title="Toggle navigation menu"
        >
          <FaBars className="text-xl" />
        </button>
        <div>
          <h2 className="text-md lg:text-lg font-bold tracking-wide text-white">
            {getScreenTitle(location.pathname)}
          </h2>
          <p className="text-[10px] text-indigo-300/60 hidden sm:block">
            Electrochemical Corrosion Monitoring System
          </p>
        </div>
      </div>

      {/* Right side: Hardware status, Notifications, Profile */}
      <div className="flex items-center gap-4 lg:gap-6">
        {/* Potentiostat Connection Status Badge */}
        <div className="hidden md:flex items-center gap-2 bg-cyan-950/40 border border-cyan-400/20 px-3 py-1.5 rounded-full text-xs text-cyan-300 font-mono">
          <FaCircle className="text-[10px] text-green-400 animate-glow" />
          <span>Workstation Connected</span>
        </div>

        {/* Alerts Bell */}
        <button
          onClick={() => navigate("/alerts")}
          className="relative p-2 text-indigo-300 hover:text-cyan-300 hover:bg-white/5 rounded-full transition-all"
          title="System Notifications"
        >
          <FaBell className="text-lg" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full animate-ping" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full" />
        </button>

        <hr className="h-6 border-l border-cyan-400/10 hidden sm:block" />

        {/* User profile dropdown trigger */}
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          title="User profile details"
        >
          <FaUserCircle className="text-2xl text-indigo-300 hover:text-cyan-300 transition-colors" />
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold leading-none text-white max-w-[140px] truncate">
              {user.name || "Dr. Alex Carter"}
            </div>
            <span className="text-[9px] text-indigo-300/70 font-mono leading-none max-w-[140px] truncate block mt-0.5">
              {user.role || "Researcher"}
            </span>
          </div>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
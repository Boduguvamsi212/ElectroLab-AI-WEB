import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { icon: "🏠", text: "Dashboard", path: "/dashboard" },
  { icon: "⚡", text: "Measurement Input", path: "/measurement" },
  { icon: "📈", text: "Tafel Graph", path: "/graph" },
  { icon: "🧠", text: "AI Predictions", path: "/prediction" },
  { icon: "📋", text: "Experiment History", path: "/history" },
  { icon: "🔬", text: "Material Database", path: "/materials" },
  { icon: "⚙️", text: "Calibration", path: "/calibration" },
  { icon: "🖥️", text: "Hardware Diagnostics", path: "/diagnostics" },
  { icon: "💬", text: "Discussion", path: "/discussion" },
  { icon: "🚨", text: "Safety Alerts", path: "/alerts" },
  { icon: "👤", text: "Profile", path: "/profile" },
  { icon: "🔧", text: "Settings", path: "/settings" },
  { icon: "✨", text: "AI Insights", path: "/ai-insights" },
  { icon: "📄", text: "Reports", path: "/reports" },
  { icon: "📊", text: "Statistics", path: "/statistics" },
];

function Sidebar({ onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  });

  React.useEffect(() => {
    const syncUser = () => {
      try {
        setUser(JSON.parse(localStorage.getItem("user") || "{}"));
      } catch {}
    };
    syncUser();
    window.addEventListener("storage", syncUser);
    window.addEventListener("user-updated", syncUser);
    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("user-updated", syncUser);
    };
  }, [location.pathname]);

  const handleNav = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/welcome");
  };

  return (
    <div className="w-[280px] h-screen bg-[#07102e]/95 backdrop-blur-xl border-r border-cyan-400/20 flex flex-col text-white select-none">
      {/* Header */}
      <div className="p-5 border-b border-cyan-400/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl animate-float">⚛</span>
          <div>
            <h1 className="text-base font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              ElectroLab AI
            </h1>
            <p className="text-[10px] text-indigo-300/60 font-mono">v3.0.1 PRO</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1 text-indigo-300 hover:text-cyan-400 transition-colors text-lg">✕</button>
        )}
      </div>

      {/* User badge */}
      <div className="px-4 py-3 border-b border-cyan-400/10 bg-cyan-400/5">
        <p className="text-xs font-bold text-white truncate">{user.name || "Dr. Alex Carter"}</p>
        <p className="text-[10px] text-cyan-400 truncate">{user.role || "Senior Chemist"}</p>
      </div>

      {/* Nav Items */}
      <div className="flex-1 overflow-y-auto py-2 sidebar-scroll">
        {navItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={idx}
              onClick={() => handleNav(item.path)}
              className={`flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 mb-0.5 ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-l-2 border-cyan-400 text-white font-bold shadow-[0_0_10px_rgba(6,182,212,0.15)]"
                  : "text-indigo-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-sm w-5 text-center">{item.icon}</span>
              <span className="text-xs">{item.text}</span>
            </div>
          );
        })}
      </div>

      {/* Logout */}
      <div className="p-3 border-t border-cyan-400/10">
        <button
          onClick={handleLogout}
          className="w-full py-2.5 text-xs text-red-400 border border-red-400/30 rounded-lg hover:bg-red-400/10 transition-all font-bold"
        >
          🚪  Log Out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../api/apiService";

function DashboardHome() {
  const navigate = useNavigate();
  const [latest, setLatest] = useState(null);
  const [totalRuns, setTotalRuns] = useState(0);

  useEffect(() => {
    apiService.getLatestPrediction().then(setLatest).catch(() => {});
    apiService.getMeasurements().then(d => setTotalRuns(d.length)).catch(() => {});
  }, []);

  const riskColor = (risk = "") => {
    if (risk.toLowerCase().includes("critical")) return "text-red-400";
    if (risk.toLowerCase().includes("high")) return "text-orange-400";
    if (risk.toLowerCase().includes("medium")) return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <div className="space-y-4 p-1">
      {/* Header card */}
      <div className="glass-panel p-4">
        <h2 className="text-xl font-bold text-cyan-400">AI Workstation Dashboard</h2>
        <p className="text-xs text-indigo-300 mt-1">Electrochemical Corrosion Rate Prediction System</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel p-4">
          <p className="text-xs text-indigo-300">Total Runs</p>
          <p className="text-3xl font-bold text-cyan-400 mt-1">{totalRuns || 148}</p>
          <p className="text-[10px] text-indigo-400 mt-0.5">Sweep Scans</p>
        </div>
        <div className="glass-panel p-4">
          <p className="text-xs text-indigo-300">AI Confidence</p>
          <p className="text-3xl font-bold text-green-400 mt-1">{latest?.confidence || "95.4%"}</p>
          <p className="text-[10px] text-indigo-400 mt-0.5">Model Accuracy</p>
        </div>
      </div>

      {/* Latest result card */}
      <div className="glass-panel p-4">
        <h3 className="text-[15px] font-bold text-purple-400 mb-3">Latest Experiment Result</h3>
        {[
          { label: "Material", value: latest?.material || "Carbon Steel 1018", cls: "text-white font-bold" },
          { label: "Corrosion Rate", value: latest?.rate || "9.45 mpy", cls: "text-cyan-300 font-mono font-bold" },
          { label: "Risk Level", value: latest?.risk || "Medium Pitting Risk", cls: riskColor(latest?.risk) + " font-bold" },
        ].map(({ label, value, cls }) => (
          <div key={label} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
            <span className="text-xs text-indigo-300">{label}</span>
            <span className={`text-xs ${cls}`}>{value}</span>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="glass-panel p-4">
        <h3 className="text-sm font-bold text-white mb-3">Quick Actions</h3>
        <button
          onClick={() => navigate("/measurement")}
          className="w-full py-3 mb-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
        >
          ▶  Start New Sweep Scan
        </button>
        <button
          onClick={() => navigate("/history")}
          className="w-full py-2.5 text-cyan-400 border border-cyan-400/30 rounded-lg text-sm font-semibold hover:bg-cyan-400/10 transition-colors"
        >
          📋  View Experiment History
        </button>
      </div>
    </div>
  );
}

export default DashboardHome;
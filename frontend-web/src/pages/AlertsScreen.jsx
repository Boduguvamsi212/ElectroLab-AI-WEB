import React, { useState } from "react";
import { FaBell, FaExclamationTriangle, FaCheckCircle, FaTrashAlt } from "react-icons/fa";

const initialAlerts = [
  { id: 1, type: "critical", msg: "Potentiostat Temperature reached 52°C threshold", time: "10 mins ago" },
  { id: 2, type: "warning", msg: "Voltage sweep drift detected during Tafel scan", time: "42 mins ago" },
  { id: 3, type: "critical", msg: "pH sensor connection unstable - check ground wire", time: "2 hrs ago" },
  { id: 4, type: "info", msg: "Periodic auto-calibration completed successfully", time: "4 hrs ago" }
];

function AlertsScreen() {
  const [alerts, setAlerts] = useState(initialAlerts);

  const clearAlert = (id) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Configure Thresholds & Current Alarm Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6 space-y-4 lg:col-span-2">
          <h3 className="text-lg font-bold text-gradient-cyan-purple">Safety Threshold Configurations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Max Working Current (mA)</label>
              <input type="number" defaultValue="200" className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white" />
            </div>
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Temperature Threshold (°C)</label>
              <input type="number" defaultValue="50" className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white" />
            </div>
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Max Scan Rate (mV/s)</label>
              <input type="number" defaultValue="5.0" className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white" />
            </div>
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Voltage Safeguard Limit (V)</label>
              <input type="number" defaultValue="12.0" className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white" />
            </div>
          </div>
          <button className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 rounded font-semibold text-sm hover:bg-cyan-500/30 transition-all">
            Save Threshold Configuration
          </button>
        </div>

        {/* Live Safety Status */}
        <div className="glass-panel p-6 flex flex-col justify-between">
          <div>
            <h4 className="text-md font-bold mb-3 text-cyan-400">Current Security State</h4>
            <div className="flex items-center gap-3 bg-red-950/20 border border-red-500/20 p-4 rounded-xl text-red-300">
              <FaExclamationTriangle className="text-2xl flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">System Alert Active</p>
                <p className="text-[10px] opacity-80">1 critical warning requires operator action</p>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)]">
            Emergency System Stop
          </button>
        </div>
      </div>

      {/* Logs and Action List */}
      <div className="glass-panel p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-md font-bold text-purple-400">Active Notifications ({alerts.length})</h4>
          {alerts.length > 0 && (
            <button onClick={() => setAlerts([])} className="text-xs text-indigo-300 hover:text-red-400 transition-colors flex items-center gap-1">
              <FaTrashAlt /> Clear All
            </button>
          )}
        </div>

        <div className="space-y-3">
          {alerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-indigo-300/40">
              <FaCheckCircle className="text-4xl mb-2 text-green-500/60" />
              <p>No active alerts. Operational systems are standard.</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div key={alert.id} className={`flex items-start justify-between p-3.5 rounded-xl border transition-all ${
                alert.type === "critical" ? "bg-red-500/5 border-red-500/20 text-red-300" :
                alert.type === "warning" ? "bg-yellow-500/5 border-yellow-500/20 text-yellow-300" :
                alert.type === "info" ? "bg-blue-500/5 border-blue-500/20 text-blue-300" :
                "bg-green-500/5 border-green-500/20 text-green-300"
              }`}>
                <div className="flex gap-3">
                  <span className="mt-1">
                    {alert.type === "critical" && <FaExclamationTriangle />}
                    {alert.type === "warning" && <FaExclamationTriangle />}
                    {alert.type === "info" && <FaBell />}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{alert.msg}</p>
                    <span className="text-[10px] opacity-60 font-mono">{alert.time}</span>
                  </div>
                </div>
                <button onClick={() => clearAlert(alert.id)} className="text-indigo-400 hover:text-white text-xs transition-colors p-1">
                  Dismiss
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AlertsScreen;

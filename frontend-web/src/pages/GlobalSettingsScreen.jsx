import React from "react";
import { FaSlidersH, FaServer, FaCogs } from "react-icons/fa";

function GlobalSettingsScreen() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Intro info */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-bold mb-2 text-gradient-cyan-purple">Global Workstation Configuration</h3>
        <p className="text-indigo-200 text-sm">
          Configure laboratory-wide parameters, local server nodes, and device identifier details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        {/* Lab Info Card */}
        <div className="glass-panel p-6 space-y-4">
          <h4 className="text-md font-bold text-cyan-400 flex items-center gap-2">
            <FaCogs /> Station Parameters
          </h4>
          <div className="space-y-3.5">
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Workstation Custom Name</label>
              <input type="text" defaultValue="ElectroLab AI Node 4B" className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white" />
            </div>
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Laboratory Division Identifier</label>
              <input type="text" defaultValue="METALLURGY-DIV-04" className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white" />
            </div>
          </div>
        </div>

        {/* Server status card */}
        <div className="glass-panel p-6 space-y-4">
          <h4 className="text-md font-bold text-purple-400 flex items-center gap-2">
            <FaServer /> Local Server Nodes
          </h4>
          <div className="space-y-3.5">
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Network Node IP Address</label>
              <input type="text" defaultValue="192.168.1.150" className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white font-mono" />
            </div>
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Backup Sync Server Port</label>
              <input type="number" defaultValue="8080" className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white font-mono" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Danger Zone reset */}
      <div className="glass-panel p-6 border-red-500/20 bg-red-500/5 space-y-3">
        <h4 className="text-md font-bold text-red-400">Danger Zone</h4>
        <p className="text-xs text-indigo-200">Resetting workstation configurations restores local caching database to factory calibration specs.</p>
        <button className="px-4 py-2 bg-red-600 hover:bg-red-750 text-white rounded font-bold text-xs transition-colors">
          Reset Station Cache
        </button>
      </div>
    </div>
  );
}

export default GlobalSettingsScreen;

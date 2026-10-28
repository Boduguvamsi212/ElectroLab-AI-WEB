import React from "react";
import { FaFolderOpen, FaShareAlt, FaPlus, FaLock } from "react-icons/fa";

const projects = [
  { id: "PROJ-1", name: "High Salinity Stainless Alloys", author: "Dr. Alex Carter", sharedWith: 3, status: "Active" },
  { id: "PROJ-2", name: "Deepwater Pipeline Inhibitors", author: "Sarah Jenkins", sharedWith: 5, status: "Active" },
  { id: "PROJ-3", name: "Aerospace Titanium Coating Study", author: "Emily Watson", sharedWith: 2, status: "Review" }
];

function SharedProjectsScreen() {
  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex justify-between items-center bg-[#0d1c4c] border border-cyan-400/20 p-4 rounded-xl">
        <h3 className="text-sm font-semibold text-white">Collaborative Lab Workspaces</h3>
        <button className="px-3.5 py-2 btn-glass-cyan text-xs font-bold rounded flex items-center gap-1.5">
          <FaPlus /> New Workspace
        </button>
      </div>

      {/* Projects Table */}
      <div className="glass-panel p-6 overflow-x-auto">
        <h4 className="text-md font-bold mb-4 text-cyan-400 flex items-center gap-2">
          <FaFolderOpen /> Joint Research Projects
        </h4>
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-cyan-400/20 text-indigo-300">
              <th className="py-2">Workspace ID</th>
              <th className="py-2">Project Name</th>
              <th className="py-2">Owner / Lead</th>
              <th className="py-2">Shared Lab Operators</th>
              <th className="py-2">Review Status</th>
              <th className="py-2 text-right">Settings</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((proj) => (
              <tr key={proj.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-3 font-mono text-cyan-300 font-bold">{proj.id}</td>
                <td className="py-3 font-semibold text-white">{proj.name}</td>
                <td className="py-3 text-indigo-200">{proj.author}</td>
                <td className="py-3 text-indigo-200 font-mono">{proj.sharedWith} users</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    proj.status === "Active" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                  }`}>
                    {proj.status}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <button className="px-2.5 py-1 text-xs btn-glass-cyan rounded flex items-center gap-1 ml-auto">
                    <FaShareAlt /> Share
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SharedProjectsScreen;

import React, { useState } from "react";
import { FaArchive, FaDownload, FaTrash, FaUndo } from "react-icons/fa";

const initialArchive = [
  { id: "ARC-102", name: "Steel 1018 Pitting Suite", date: "Jan 12, 2026", size: "4.8 MB", curves: 48 },
  { id: "ARC-103", name: "Alloy C276 In NaCl high temperature", date: "Feb 28, 2026", size: "2.1 MB", curves: 20 },
  { id: "ARC-104", name: "Aluminum passivation sweep study", date: "Apr 05, 2026", size: "8.4 MB", curves: 96 }
];

function ArchiveScreen() {
  const [archives, setArchives] = useState(initialArchive);

  const deleteArchive = (id) => {
    setArchives(archives.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-bold mb-2 text-gradient-cyan-purple">Archive Management</h3>
        <p className="text-indigo-200 text-sm">
          Compress and freeze completed research runs. Archived runs are stored in high-density compressed formats to preserve database space while keeping raw curve parameters auditable.
        </p>
      </div>

      {/* Archives Table */}
      <div className="glass-panel p-6 overflow-x-auto">
        <h4 className="text-md font-bold mb-4 text-cyan-400 flex items-center gap-2">
          <FaArchive /> Compressed Historical Archives
        </h4>
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-cyan-400/20 text-indigo-300">
              <th className="py-2">Archive ID</th>
              <th className="py-2">Workspace Name</th>
              <th className="py-2">Freeze Date</th>
              <th className="py-2">Curves Count</th>
              <th className="py-2">File Size</th>
              <th className="py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {archives.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-indigo-300/40">No archives currently stored.</td>
              </tr>
            ) : (
              archives.map((arc) => (
                <tr key={arc.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 font-mono text-cyan-300 font-bold">{arc.id}</td>
                  <td className="py-3 font-semibold text-white">{arc.name}</td>
                  <td className="py-3 text-indigo-200">{arc.date}</td>
                  <td className="py-3 text-indigo-200">{arc.curves}</td>
                  <td className="py-3 text-indigo-200 font-mono">{arc.size}</td>
                  <td className="py-3 text-right space-x-2">
                    <button className="p-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded hover:bg-cyan-500/20 transition-colors" title="Download ZIP Archive">
                      <FaDownload />
                    </button>
                    <button className="p-1.5 bg-purple-500/10 border border-purple-500/30 text-purple-300 rounded hover:bg-purple-500/20 transition-colors" title="Restore to Workspace">
                      <FaUndo />
                    </button>
                    <button onClick={() => deleteArchive(arc.id)} className="p-1.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded hover:bg-red-500/20 transition-colors" title="Permanent Delete">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ArchiveScreen;

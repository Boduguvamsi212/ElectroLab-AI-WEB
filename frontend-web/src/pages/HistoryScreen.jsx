import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHistory, FaFolderOpen } from "react-icons/fa";
import apiService from "../api/apiService";

function HistoryScreen() {
  const navigate = useNavigate();
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const list = await apiService.getMeasurements();
        setRuns(list);
      } catch (err) {
        console.error("Failed to load runs history", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleLoadRun = (run) => {
    localStorage.setItem("activeRun", JSON.stringify(run));
    navigate("/graph");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-cyan-400">
        <span className="animate-spin text-2xl mr-2">⚛</span> Loading Run Logs...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-bold mb-2 text-gradient-cyan-purple">Experiment History</h3>
        <p className="text-indigo-200 text-sm">
          Access past potentiodynamic polarization sweeps, material database settings, and AI fitting logs.
        </p>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {runs.length === 0 ? (
          <div className="glass-panel p-8 text-center text-indigo-300">
            No sweep logs stored in workstation. Start a scan under 'Measurement Input' to generate runs.
          </div>
        ) : (
          runs.map((item) => {
            const formattedDate = new Date(item.timestamp).toLocaleDateString("en-US", {
              year: 'numeric', month: 'short', day: 'numeric',
              hour: '2-digit', minute: '2-digit'
            });
            return (
              <div 
                key={item.id} 
                className="glass-panel p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-white/5 hover:border-cyan-400/30 transition-all"
              >
                <div className="space-y-1">
                  <span className="text-[10px] text-indigo-300 font-mono">RUN IDENTIFIER: {item.runNumber}</span>
                  <h4 className="font-bold text-white text-base leading-snug">{item.material}</h4>
                  <span className="text-xs text-indigo-200 block">Date of Run: {formattedDate}</span>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                      Completed
                    </span>
                    <p className="text-xs font-mono font-bold text-cyan-300 mt-1">{item.rate}</p>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleLoadRun(item)}
                      className="px-3 py-1.5 btn-glass-cyan text-xs font-bold rounded flex items-center gap-1"
                    >
                      <FaFolderOpen /> Load
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default HistoryScreen;
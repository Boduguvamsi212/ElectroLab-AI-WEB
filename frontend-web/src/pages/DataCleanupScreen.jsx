import React, { useState } from "react";
import { FaFilter, FaBroom, FaSpinner, FaCheckCircle } from "react-icons/fa";

function DataCleanupScreen() {
  const [cleaning, setCleaning] = useState(false);
  const [cleaned, setCleaned] = useState(false);

  const startCleanup = () => {
    setCleaning(true);
    setTimeout(() => {
      setCleaning(false);
      setCleaned(true);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Intro info */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-bold mb-2 text-gradient-cyan-purple">Signal Noise Filter & Cleanup</h3>
        <p className="text-indigo-200 text-sm">
          Remove signal glitches caused by bubbles forming on working electrodes, high solution resistance, or mechanical vibrations during sweeps. Filter duplicate points or trim baseline offsets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Filter rules */}
        <div className="glass-panel p-6 space-y-4">
          <h4 className="text-md font-bold text-cyan-400">Cleanup Operations Configuration</h4>
          <div className="space-y-3.5 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-cyan-500" />
              Remove polarization potential spikes (&gt; 50 mV swing)
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-cyan-500" />
              Remove high-frequency noise using Savitzky-Golay
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-cyan-500" />
              Trim incomplete polarization curve segments
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-cyan-500" />
              Clear local cached temporary datasets
            </label>
          </div>
        </div>

        {/* Clean status card */}
        <div className="glass-panel p-6 flex flex-col justify-between">
          <div>
            <h4 className="text-md font-bold text-purple-400 mb-3">Cleanup Diagnostics</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Estimated Spikes Found</span>
                <span className="font-semibold text-yellow-400">42 points</span>
              </div>
              <div className="flex justify-between">
                <span>Duplicate Curves Detected</span>
                <span className="font-semibold text-white">0</span>
              </div>
              <div className="flex justify-between">
                <span>Recommended Memory Savings</span>
                <span className="font-semibold text-green-400">4.2 MB</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={startCleanup}
            disabled={cleaning}
            className="w-full mt-4 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-bold text-sm hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
          >
            {cleaning ? (
              <>
                <FaSpinner className="animate-spin" /> Filtering Noise...
              </>
            ) : cleaned ? (
              <>
                <FaCheckCircle /> Cleanup Completed
              </>
            ) : (
              <>
                <FaBroom /> Run Curve Filter Cleanup
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataCleanupScreen;

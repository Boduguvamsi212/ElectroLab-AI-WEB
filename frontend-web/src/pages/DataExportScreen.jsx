import React from "react";
import { FaFileCsv, FaFileCode, FaCloudDownloadAlt, FaShieldAlt } from "react-icons/fa";

function DataExportScreen() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Introduction */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-bold mb-2 text-gradient-cyan-purple">Export Laboratory Datasets</h3>
        <p className="text-indigo-200 text-sm">
          Download polarization curve arrays, fitted Tafel slopes, material characteristics, and prediction parameters. Choose fields to include and preferred data layout formats.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fields to include */}
        <div className="glass-panel p-6 space-y-4">
          <h4 className="text-md font-bold text-cyan-400">Select Fields to Include</h4>
          <div className="space-y-3.5 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-cyan-500" />
              Raw Curve Coordinates (Voltage & Current)
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-cyan-500" />
              Stern-Geary Constant (B) & Rp
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-cyan-500" />
              AI Corrosion Rate Prediction Output
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-cyan-500" />
              Electrolyte Details & pH values
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-cyan-500" />
              Hardware Calibration Logs
            </label>
          </div>
        </div>

        {/* Formats and export */}
        <div className="glass-panel p-6 space-y-4 flex flex-col justify-between">
          <div>
            <h4 className="text-md font-bold text-purple-400 mb-4">Export File Format</h4>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center p-4 bg-white/5 border border-cyan-400/20 hover:border-cyan-400/50 rounded-xl transition-all">
                <FaFileCsv className="text-3xl text-green-400 mb-2" />
                <span className="text-xs font-semibold text-white">Comma Separated (CSV)</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-white/5 border border-purple-500/20 hover:border-purple-500/50 rounded-xl transition-all">
                <FaFileCode className="text-3xl text-purple-400 mb-2" />
                <span className="text-xs font-semibold text-white">JavaScript Object (JSON)</span>
              </button>
            </div>
          </div>
          <button className="w-full mt-4 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-bold text-sm hover:opacity-95 transition-opacity flex items-center justify-center gap-2">
            <FaCloudDownloadAlt className="text-lg" /> Generate Export Package
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataExportScreen;

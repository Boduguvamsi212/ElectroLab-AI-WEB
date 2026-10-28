import React, { useState } from "react";
import { FaUpload, FaFileCsv, FaCheckCircle, FaSpinner } from "react-icons/fa";

function DataImportScreen() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = () => {
    if (!file) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Dataset file imported successfully!");
      setFile(null);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Upload Zone */}
      <div className="glass-panel p-8 text-center border-dashed border-2 border-cyan-400/20 hover:border-cyan-400/40 cursor-pointer transition-colors relative">
        <input
          type="file"
          accept=".csv,.txt,.json"
          onChange={(e) => setFile(e.target.files[0])}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center">
          <FaUpload className="text-4xl text-cyan-400 mb-3 animate-float" />
          <h4 className="text-md font-bold text-white mb-1">
            {file ? file.name : "Select Laboratory Dataset File"}
          </h4>
          <p className="text-xs text-indigo-300">
            {file ? `${(file.size / 1024).toFixed(1)} KB` : "Drag and drop raw CSV or biological text export"}
          </p>
        </div>
      </div>

      {file && (
        <div className="flex justify-end gap-2">
          <button onClick={() => setFile(null)} className="px-4 py-2 border border-white/10 rounded text-xs text-indigo-300 hover:bg-white/5">
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={loading}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded font-bold text-xs flex items-center gap-1.5"
          >
            {loading ? <FaSpinner className="animate-spin" /> : <FaCheckCircle />} Upload File
          </button>
        </div>
      )}

      {/* Parser Settings */}
      <div className="glass-panel p-6 space-y-4">
        <h4 className="text-md font-bold text-purple-400">Import Parser Parameters</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div>
            <label className="text-xs text-indigo-300 block mb-1">Column Delimiter</label>
            <select className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2 text-white">
              <option>Comma ( , )</option>
              <option>Semicolon ( ; )</option>
              <option>Tab Space ( \t )</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-indigo-300 block mb-1">Skip Header Rows</label>
            <input type="number" defaultValue="1" className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2 text-white" />
          </div>
          <div>
            <label className="text-xs text-indigo-300 block mb-1">Potential Unit Mapping</label>
            <select className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2 text-white">
              <option>Volts (V)</option>
              <option>Millivolts (mV)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataImportScreen;

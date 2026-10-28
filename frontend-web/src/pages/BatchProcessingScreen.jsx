import React, { useState } from "react";
import { FaUpload, FaPlay, FaCheck, FaSpinner } from "react-icons/fa";

const initialQueue = [
  { file: "tafel_scan_alloy316_01.csv", size: "142 KB", status: "Completed", rate: "4.12 mpy" },
  { file: "tafel_scan_alloy316_02.csv", size: "138 KB", status: "Completed", rate: "4.25 mpy" },
  { file: "tafel_scan_carbon1018_01.csv", size: "155 KB", status: "Running", rate: "Analyzing..." },
  { file: "tafel_scan_carbon1018_02.csv", size: "154 KB", status: "Queued", rate: "Pending" }
];

function BatchProcessingScreen() {
  const [queue, setQueue] = useState(initialQueue);
  const [isProcessing, setIsProcessing] = useState(false);

  const startBatch = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setQueue(queue.map(item => ({
        ...item,
        status: "Completed",
        rate: item.rate === "Analyzing..." || item.rate === "Pending" ? "12.24 mpy" : item.rate
      })));
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Drag & Drop File Zone */}
      <div className="glass-panel p-8 text-center border-dashed border-2 border-cyan-400/20 hover:border-cyan-400/40 cursor-pointer transition-colors flex flex-col items-center">
        <FaUpload className="text-4xl text-cyan-400 mb-3 animate-float" />
        <h4 className="text-md font-bold text-white mb-1">Drag & Drop Batch Tafel Files</h4>
        <p className="text-xs text-indigo-300">Supports .csv, .txt, .xlsx standard biological export formats (Max 50 files)</p>
      </div>

      {/* Queue and Stats */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Batch Queue */}
        <div className="glass-panel p-6 xl:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-md font-bold text-cyan-400">Queue List</h4>
            <button
              onClick={startBatch}
              disabled={isProcessing}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              {isProcessing ? <FaSpinner className="animate-spin" /> : <FaPlay />} Start Batch Fit
            </button>
          </div>

          <div className="space-y-3">
            {queue.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-3.5 bg-white/5 rounded-xl border border-white/5 text-sm">
                <div>
                  <p className="font-semibold text-white">{item.file}</p>
                  <span className="text-[10px] text-indigo-300/50 font-mono">{item.size}</span>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    item.status === "Completed" ? "bg-green-500/10 text-green-400" :
                    item.status === "Running" ? "bg-cyan-500/10 text-cyan-400" :
                    "bg-yellow-500/10 text-yellow-400"
                  }`}>
                    {item.status}
                  </span>
                  <p className="text-xs font-mono font-bold text-indigo-300 mt-1">{item.rate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Batch Summary */}
        <div className="glass-panel p-6 space-y-4 flex flex-col justify-between">
          <div>
            <h4 className="text-md font-bold text-purple-400 mb-4">Batch Progress Metrics</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Queue Completion</span>
                  <span>50%</span>
                </div>
                <div className="w-full bg-[#1b2b62] h-2 rounded overflow-hidden">
                  <div className="bg-cyan-400 h-full w-1/2 rounded" />
                </div>
              </div>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-indigo-300">Total Uploaded Files</span>
                  <span className="font-semibold">4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-300">Failed Curves</span>
                  <span className="font-semibold text-red-400">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-300">Avg Fitting Confidence</span>
                  <span className="font-semibold text-green-400">97.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BatchProcessingScreen;

import React, { useState } from "react";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { FaPalette, FaDownload, FaChartLine } from "react-icons/fa";

const nyquistData = [
  { zReal: 10, zImage: 0 },
  { zReal: 40, zImage: 25 },
  { zReal: 70, zImage: 40 },
  { zReal: 100, zImage: 45 },
  { zReal: 130, zImage: 42 },
  { zReal: 160, zImage: 32 },
  { zReal: 190, zImage: 15 },
  { zReal: 210, zImage: 0 }
];

function VisualizationScreen() {
  const [chartColor, setChartColor] = useState("#06b6d4");

  return (
    <div className="space-y-6">
      {/* Chart controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#0d1c4c] border border-cyan-400/20 p-4 rounded-xl">
        <div className="flex items-center gap-3 text-sm">
          <FaPalette className="text-cyan-400" />
          <span>Chart Primary Color:</span>
          <div className="flex gap-2">
            {["#06b6d4", "#a855f7", "#10b981", "#f59e0b"].map((color) => (
              <button
                key={color}
                onClick={() => setChartColor(color)}
                style={{ backgroundColor: color }}
                className={`w-5 h-5 rounded-full border-2 ${chartColor === color ? "border-white" : "border-transparent"}`}
              />
            ))}
          </div>
        </div>
        <button className="px-3.5 py-2 btn-glass-cyan text-xs font-bold rounded flex items-center gap-1.5">
          <FaDownload /> Export Image (SVG)
        </button>
      </div>

      {/* Main Studio View */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Custom Nyquist Plot */}
        <div className="glass-panel p-6 xl:col-span-2">
          <h3 className="text-md font-bold mb-4 text-cyan-400 flex items-center gap-2">
            <FaChartLine /> Nyquist Spectroscopic Plot (Z' vs -Z'')
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="zReal" name="Z' Real" unit="Ω" stroke="#a5b4fc" />
                <YAxis type="number" dataKey="zImage" name="-Z'' Imaginary" unit="Ω" stroke="#a5b4fc" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} contentStyle={{ background: "#0c1840", borderColor: chartColor }} />
                <Scatter name="EIS Data" data={nyquistData} fill={chartColor} line shape="circle" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Visualizer Configuration Panel */}
        <div className="glass-panel p-6 space-y-4">
          <h4 className="text-md font-bold text-purple-400">Plot Options</h4>
          <div className="space-y-3 text-sm">
            <div>
              <label className="text-xs text-indigo-300 block mb-1">X-Axis Scale</label>
              <select className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2 text-white">
                <option>Linear (Recommended)</option>
                <option>Logarithmic (Log10)</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Grid Overlay Intensity</label>
              <input type="range" min="10" max="100" defaultValue="40" className="w-full accent-cyan-500" />
            </div>
            <div className="flex items-center justify-between">
              <span>Show Bode Phase Angle</span>
              <input type="checkbox" className="w-4 h-4 accent-cyan-500" />
            </div>
            <div className="flex items-center justify-between">
              <span>Auto-Fit Axis Bounds</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-cyan-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisualizationScreen;

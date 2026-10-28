import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { FaDatabase, FaServer } from "react-icons/fa";

const storageDistribution = [
  { name: "Raw Curve Data points", value: 450, color: "#06b6d4" },
  { name: "AI ML Weights & Models", value: 120, color: "#a855f7" },
  { name: "Static Report PDFs", value: 80, color: "#10b981" },
  { name: "Unused Free Space", value: 350, color: "rgba(255,255,255,0.06)" }
];

function StorageAnalyticsScreen() {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-5 space-y-1">
          <span className="text-xs text-indigo-300 font-mono">DATABASE TOTAL SIZE</span>
          <div className="text-2xl font-black text-white">1,024 MB (1.0 GB)</div>
          <p className="text-[10px] text-indigo-300/50">Shared multi-user network node</p>
        </div>
        <div className="glass-panel p-5 space-y-1">
          <span className="text-xs text-indigo-300 font-mono">USED SPACE CAPACITY</span>
          <div className="text-2xl font-black text-cyan-300">650 MB (63%)</div>
          <p className="text-[10px] text-indigo-300/50">Auto-archiving triggers at 85%</p>
        </div>
        <div className="glass-panel p-5 space-y-1">
          <span className="text-xs text-indigo-300 font-mono">TOTAL RECORD ROWS</span>
          <div className="text-2xl font-black text-purple-300">1,242,950 rows</div>
          <p className="text-[10px] text-indigo-300/50">Index health rate: 99.8%</p>
        </div>
      </div>

      {/* Grid: PieChart & Storage Table */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Pie chart */}
        <div className="glass-panel p-6 flex flex-col items-center">
          <h3 className="text-md font-bold mb-4 text-cyan-400 self-start">Space Allocation Distribution</h3>
          <div className="h-[250px] w-full max-w-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={storageDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {storageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#0c1840", borderColor: "#06b6d4" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs mt-2">
            {storageDistribution.map((item, idx) => (
              <span key={idx} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.name} ({item.value} MB)</span>
              </span>
            ))}
          </div>
        </div>

        {/* Database performance / settings */}
        <div className="glass-panel p-6 space-y-4">
          <h3 className="text-md font-bold text-purple-400 flex items-center gap-2">
            <FaServer /> Database Sync Statistics
          </h3>
          <div className="space-y-3.5 text-sm">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-indigo-300">Local Cache Hits</span>
              <span className="font-semibold text-white">94.8%</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-indigo-300">Write Operations Latency</span>
              <span className="font-semibold text-white font-mono">12 ms</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-indigo-300">Weekly Backup Sync</span>
              <span className="font-semibold text-green-400">Successful</span>
            </div>
          </div>
          <button className="w-full py-2.5 bg-purple-500/20 border border-purple-500/40 text-purple-300 rounded font-bold text-xs hover:bg-purple-500/30 transition-all">
            Defragment Database Indexes
          </button>
        </div>
      </div>
    </div>
  );
}

export default StorageAnalyticsScreen;

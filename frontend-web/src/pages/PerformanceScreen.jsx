import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { FaHeartbeat, FaMemory, FaHdd } from "react-icons/fa";

const streamPerformance = Array.from({ length: 12 }, (_, i) => ({
  time: `${i * 10}s`,
  cpu: (15 + 10 * Math.sin(i / 2)).toFixed(0),
  ram: (4.2 + 0.1 * Math.sin(i / 3)).toFixed(1),
  fps: (60 - 2 * Math.cos(i)).toFixed(0)
}));

function PerformanceScreen() {
  return (
    <div className="space-y-6">
      {/* Cards stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-5 space-y-1">
          <div className="flex justify-between items-center text-xs text-indigo-300 font-mono">
            <span>CPU INFERENCE LOAD</span>
            <FaHeartbeat className="text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">18%</div>
          <p className="text-[10px] text-indigo-300/60">Tafel neural regressor backend</p>
        </div>

        <div className="glass-panel p-5 space-y-1">
          <div className="flex justify-between items-center text-xs text-indigo-300 font-mono">
            <span>MEMORY (RAM) USE</span>
            <FaMemory className="text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">4.3 GB / 8.0 GB</div>
          <p className="text-[10px] text-indigo-300/60">Heap usage: 142 MB</p>
        </div>

        <div className="glass-panel p-5 space-y-1">
          <div className="flex justify-between items-center text-xs text-indigo-300 font-mono">
            <span>LOCAL DATA SPACE</span>
            <FaHdd className="text-green-400" />
          </div>
          <div className="text-2xl font-black text-white">12.4 MB</div>
          <p className="text-[10px] text-indigo-300/60">IndexedDB local offline storage</p>
        </div>
      </div>

      {/* Grid chart */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Cpu load chart */}
        <div className="glass-panel p-6">
          <h3 className="text-md font-bold mb-4 text-cyan-400">Processor Performance (CPU %)</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={streamPerformance}>
                <defs>
                  <linearGradient id="cpuColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" stroke="#a5b4fc" />
                <YAxis stroke="#a5b4fc" domain={[0, 50]} />
                <Tooltip contentStyle={{ background: "#0c1840", borderColor: "#06b6d4" }} />
                <Area type="monotone" dataKey="cpu" stroke="#06b6d4" fillOpacity={1} fill="url(#cpuColor)" name="CPU Usage (%)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System FPS chart */}
        <div className="glass-panel p-6">
          <h3 className="text-md font-bold mb-4 text-purple-400">Graphics Frame Rate (FPS)</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={streamPerformance}>
                <defs>
                  <linearGradient id="fpsColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" stroke="#a5b4fc" />
                <YAxis stroke="#a5b4fc" domain={[50, 65]} />
                <Tooltip contentStyle={{ background: "#0c1840", borderColor: "#a855f7" }} />
                <Area type="monotone" dataKey="fps" stroke="#a855f7" fillOpacity={1} fill="url(#fpsColor)" name="Render Rate (FPS)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerformanceScreen;

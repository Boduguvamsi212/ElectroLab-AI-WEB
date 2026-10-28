import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { FaCalculator, FaDatabase } from "react-icons/fa";

const data = [
  { name: "Run 1", actual: 12.1, predicted: 12.4 },
  { name: "Run 2", actual: 8.4, predicted: 8.2 },
  { name: "Run 3", actual: 15.6, predicted: 15.1 },
  { name: "Run 4", actual: 4.2, predicted: 4.5 },
  { name: "Run 5", actual: 18.9, predicted: 19.3 }
];

function StatisticsScreen() {
  return (
    <div className="space-y-6">
      {/* Metrics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-5 space-y-1">
          <span className="text-xs text-indigo-300 font-mono">COEFFICIENT OF DETERMINATION (R²)</span>
          <div className="text-3xl font-black text-green-400">0.9842</div>
          <p className="text-[10px] text-indigo-300/60">Calculated over last 250 test cycles</p>
        </div>
        <div className="glass-panel p-5 space-y-1">
          <span className="text-xs text-indigo-300 font-mono">ROOT MEAN SQUARED ERROR (RMSE)</span>
          <div className="text-3xl font-black text-cyan-400">0.245 mpy</div>
          <p className="text-[10px] text-indigo-300/60">Relative error bounds vs weight loss</p>
        </div>
        <div className="glass-panel p-5 space-y-1">
          <span className="text-xs text-indigo-300 font-mono">STANDARD DEVIATION</span>
          <div className="text-3xl font-black text-purple-400">±0.12 mpy</div>
          <p className="text-[10px] text-indigo-300/60">Within ASTM-G5 repeatability limit</p>
        </div>
      </div>

      {/* Grid: BarChart & Variance Table */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Actual vs Predicted BarChart */}
        <div className="glass-panel p-6">
          <h3 className="text-md font-bold mb-4 text-cyan-400">Model Predictor Variance (Actual vs. Predicted Rate)</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis unit=" mpy" />
                <Tooltip contentStyle={{ background: "#0c1840", borderColor: "#06b6d4" }} />
                <Bar dataKey="actual" fill="#384cb5" name="Actual Rate" />
                <Bar dataKey="predicted" fill="#06b6d4" name="Predicted Rate" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Statistical parameters */}
        <div className="glass-panel p-6 space-y-4">
          <h3 className="text-md font-bold text-purple-400 flex items-center gap-2">
            <FaCalculator /> Chi-Square Fitting Metrics
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span>Reduced Chi-Square (χ²)</span>
              <span className="font-mono font-bold text-white">1.042e-4</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span>Degrees of Freedom (DF)</span>
              <span className="font-mono font-bold text-white">96</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span>Confidence Interval (CI)</span>
              <span className="font-mono font-bold text-green-400">95.0%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>R-Square Adj.</span>
              <span className="font-mono font-bold text-cyan-300">0.9815</span>
            </div>
          </div>
          <button className="w-full py-2.5 rounded-lg btn-glass-cyan text-xs font-bold">
            Recalculate Regression Bounds
          </button>
        </div>
      </div>
    </div>
  );
}

export default StatisticsScreen;

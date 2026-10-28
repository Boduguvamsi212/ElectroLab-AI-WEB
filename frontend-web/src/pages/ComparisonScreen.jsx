import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const comparisonData = [
  { method: "Weight Loss (Gravimetric)", timeHours: 720, errorPct: 8.5, precision: "Medium", cost: "Low" },
  { method: "Tafel Fit Extrapolation", timeHours: 1, errorPct: 12.0, precision: "Medium-Low", cost: "Medium" },
  { method: "EIS (Impedance)", timeHours: 2, errorPct: 9.2, precision: "High", cost: "High" },
  { method: "AI Predicative Workstation", timeHours: 0.05, errorPct: 3.1, precision: "Very High", cost: "Low" }
];

const chartData = [
  { name: "Weight Loss", Traditional: 8.5, AI: 3.1 },
  { name: "Tafel Fit", Traditional: 12.0, AI: 3.1 },
  { name: "EIS Analysis", Traditional: 9.2, AI: 3.1 }
];

function ComparisonScreen() {
  return (
    <div className="space-y-6">
      {/* Overview Intro */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-bold mb-2 text-gradient-cyan-purple">Methodology Comparison</h3>
        <p className="text-indigo-200 text-sm">
          Compare standard electrochemical measurements with AI prediction models. AI-driven models process Tafel curve noise patterns, electrolyte pH levels, and alloy structures to predict long-term corrosion rates in seconds rather than hours or days.
        </p>
      </div>

      {/* Grid: Chart & Table */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Comparison Chart */}
        <div className="glass-panel p-6">
          <h4 className="text-md font-semibold mb-4 text-cyan-400">Error Rate Benchmark (%)</h4>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis unit="%" />
                <Tooltip contentStyle={{ background: "#0c1840", borderColor: "#06b6d4", color: "#fff" }} />
                <Legend />
                <Bar dataKey="Traditional" fill="#384CB5" name="Traditional Method Error" />
                <Bar dataKey="AI" fill="#06b6d4" name="ElectroLab AI Model Error" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="glass-panel p-6 overflow-x-auto">
          <h4 className="text-md font-semibold mb-4 text-cyan-400">Electrochemical Parameters Matrix</h4>
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-cyan-400/20 text-indigo-300">
                <th className="py-2">Methodology</th>
                <th className="py-2">Analysis Time</th>
                <th className="py-2">Error Margin</th>
                <th className="py-2">Precision</th>
                <th className="py-2">Operational Cost</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 font-semibold text-white">{row.method}</td>
                  <td className="py-3 text-indigo-200">{row.timeHours} hrs</td>
                  <td className="py-3 text-cyan-300 font-mono font-bold">{row.errorPct}%</td>
                  <td className="py-3 text-indigo-200">{row.precision}</td>
                  <td className="py-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      row.cost === "Low" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                      row.cost === "Medium" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" :
                      "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}>
                      {row.cost}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Methodology Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-5 space-y-2">
          <h5 className="font-bold text-white text-sm">Linear Tafel Extrapolation</h5>
          <p className="text-xs text-indigo-200/80">
            Highly sensitive to electrode positioning and local concentration polarizations. Prone to human fitting error during manual Tafel slope alignment.
          </p>
        </div>
        <div className="glass-panel p-5 space-y-2">
          <h5 className="font-bold text-white text-sm">EIS Curve Fitting</h5>
          <p className="text-xs text-indigo-200/80">
            Provides complete electrochemical interface insights but requires hours of steady-state stability. Analysis calculations are highly complex.
          </p>
        </div>
        <div className="glass-panel p-5 space-y-2">
          <h5 className="font-bold text-white text-sm">Neural Network Predictor</h5>
          <p className="text-xs text-indigo-200/80">
            Combines real-time polarization slope details, alloy composition indexes, and surrounding solution factors to instantly compute polarization resistance (Rp).
          </p>
        </div>
      </div>
    </div>
  );
}

export default ComparisonScreen;

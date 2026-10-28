import React from "react";
import { FaBrain, FaWrench, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

function AIInsightsScreen() {
  const recommendations = [
    {
      id: "REC-410",
      title: "Galvanic Anomaly Detected",
      alloy: "Carbon Steel 1018",
      severity: "High",
      detail: "AI detected a potential galvanic mismatch in Solution B (pH 4). Model predicts accelerated pitting corrosion at grain boundaries."
    },
    {
      id: "REC-411",
      title: "Inhibitor Degradation Warning",
      alloy: "Alloy 6001",
      severity: "Medium",
      detail: "Corrosion inhibitor efficiency drops by 12% in environments exceeding 35°C. Recommend switching to high-temperature compound."
    },
    {
      id: "REC-412",
      title: "Oxide Layer Passivation Steady",
      alloy: "Stainless 316L",
      severity: "Optimal",
      detail: "Stable passive layer formation confirmed by high polarization resistance (Rp > 120 kΩ·cm²)."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel p-6 flex items-center gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -z-10" />
        <FaBrain className="text-5xl text-purple-400 animate-glow flex-shrink-0" />
        <div>
          <h3 className="text-xl font-bold text-gradient-cyan-purple">AI Electrochemical Insights</h3>
          <p className="text-sm text-indigo-200">
            Real-time neural network monitoring scans electrochemical curves for trace passivation breakdown, pitting spikes, and inhibitor decay markers.
          </p>
        </div>
      </div>

      {/* Grid: Diagnostics and Recommendations */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recommendation Cards */}
        <div className="xl:col-span-2 space-y-4">
          <h4 className="text-md font-semibold text-cyan-400">Model Insights Log</h4>
          {recommendations.map((rec) => (
            <div key={rec.id} className="glass-panel p-5 space-y-3 relative">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-indigo-300 font-mono">{rec.id} • {rec.alloy}</span>
                  <h5 className="font-bold text-white text-base mt-0.5">{rec.title}</h5>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  rec.severity === "High" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                  rec.severity === "Medium" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                  "bg-green-500/10 text-green-400 border-green-500/20"
                }`}>
                  {rec.severity}
                </span>
              </div>
              <p className="text-sm text-indigo-200">{rec.detail}</p>
            </div>
          ))}
        </div>

        {/* Action Widgets */}
        <div className="space-y-6">
          {/* Predictive Health Card */}
          <div className="glass-panel p-6 space-y-4">
            <h4 className="text-md font-bold text-purple-400 flex items-center gap-2">
              <FaWrench /> Machine Learning Models
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span>Curve Filter CNN</span>
                <span className="text-green-400">98.2% Acc</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span>Tafel Slope Regressor</span>
                <span className="text-green-400">97.5% Acc</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Pitting Predictor</span>
                <span className="text-cyan-300">94.1% Acc</span>
              </div>
            </div>
            <button className="w-full py-2 bg-purple-500/20 border border-purple-500/40 text-purple-300 rounded font-semibold text-xs hover:bg-purple-500/30 transition-colors">
              Retrain Classifier Models
            </button>
          </div>

          {/* Quick Stats */}
          <div className="glass-panel p-6 space-y-3">
            <h4 className="text-sm font-bold text-white">Anomalies Detected (24h)</h4>
            <div className="text-4xl font-extrabold text-red-400">3</div>
            <p className="text-xs text-indigo-300/60">Average grain scan deviation is within ASTM standard margins.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIInsightsScreen;

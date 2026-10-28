import React from "react";
import { FaBrain, FaExclamationTriangle } from "react-icons/fa";

function AIInsights() {
  return (
    <div className="glass-panel p-6 space-y-4 flex-1">
      <h3 className="text-lg font-bold text-purple-400 flex items-center gap-2">
        <FaBrain className="animate-glow" /> AI Pitting Risk Insights
      </h3>

      <div className="space-y-3.5 text-sm">
        <div className="flex justify-between border-b border-white/5 pb-2">
          <span className="text-indigo-200">Risk Evaluation</span>
          <span className="font-semibold text-yellow-400 flex items-center gap-1.5">
            <FaExclamationTriangle /> Medium Pitting Risk
          </span>
        </div>

        <div className="flex justify-between border-b border-white/5 pb-2">
          <span className="text-indigo-200">Estimated Passivation Life</span>
          <span className="font-semibold text-white font-mono">4.8 Years</span>
        </div>

        <div className="space-y-1 text-xs text-indigo-300">
          <span className="block font-semibold">Recommendation:</span>
          <p className="opacity-80">
            Apply Protective Epoxy Barrier coating to mitigate localized concentration pit propagation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AIInsights;
import React from "react";
import { FaHistory, FaCheckCircle } from "react-icons/fa";

function RecentExperiments() {
  const experiments = [
    { id: "#148", material: "Carbon Steel 1018", rate: "12.42 mpy", status: "Completed" },
    { id: "#147", material: "Stainless Steel 316L", rate: "0.14 mpy", status: "Completed" },
    { id: "#146", material: "Alloy C276 (Hastelloy)", rate: "In progress", status: "Running" }
  ];

  return (
    <div className="glass-panel p-6 space-y-4 flex-1">
      <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
        <FaHistory /> Recent Polarization Runs
      </h3>

      <div className="space-y-3">
        {experiments.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3.5 bg-white/5 border border-white/5 hover:border-cyan-400/20 rounded-xl transition-all"
          >
            <div>
              <div className="font-bold text-white text-sm">Experiment {item.id}</div>
              <small className="text-indigo-300/70">{item.material}</small>
            </div>

            <div className="text-right">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                item.status === "Completed" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
              }`}>
                {item.status}
              </span>
              <p className="text-xs font-mono font-bold text-indigo-300 mt-1">{item.rate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentExperiments;
import React, { useState } from "react";
import { FaGraduationCap, FaCheckCircle, FaRegCircle } from "react-icons/fa";

const initialSteps = [
  { id: 1, text: "Assemble the three-electrode cell: Working, Reference (SCE), and Counter (Pt)", completed: true },
  { id: 2, text: "Prepare 3.5% NaCl electrolyte solution and measure initial pH", completed: true },
  { id: 3, text: "Execute reference offset check and register zero-calibration calibration", completed: false },
  { id: 4, text: "Configure a Tafel Sweep from -250 mV to +250 mV at 0.166 mV/sec rate", completed: false }
];

function TrainingScreen() {
  const [steps, setSteps] = useState(initialSteps);

  const toggleStep = (id) => {
    setSteps(steps.map(s => s.id === id ? { ...s, completed: !s.completed } : s));
  };

  const progressPercent = Math.round((steps.filter(s => s.completed).length / steps.length) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Intro info */}
      <div className="glass-panel p-6 flex items-center gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -z-10" />
        <FaGraduationCap className="text-5xl text-purple-400 animate-float flex-shrink-0" />
        <div>
          <h3 className="text-xl font-bold text-gradient-cyan-purple">Interactive Laboratory Training</h3>
          <p className="text-sm text-indigo-200">
            Learn correct laboratory procedures for setting up standard three-electrode cells and running polarization sweeps.
          </p>
        </div>
      </div>

      {/* Progress card */}
      <div className="glass-panel p-6 space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="font-bold text-cyan-400">Module: Potentiodynamic Tafel Setup</span>
          <span className="font-mono font-bold text-white">{progressPercent}% Completed</span>
        </div>
        <div className="w-full bg-[#1b2b62] h-2 rounded overflow-hidden">
          <div className="bg-cyan-400 h-full rounded transition-all duration-350" style={{ width: `${progressPercent}%` }} />
        </div>

        {/* Steps checklists */}
        <div className="space-y-2 mt-4 text-sm">
          {steps.map((step) => (
            <div
              key={step.id}
              onClick={() => toggleStep(step.id)}
              className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 hover:bg-white/10 rounded-xl cursor-pointer transition-colors"
            >
              {step.completed ? (
                <FaCheckCircle className="text-green-400 text-lg flex-shrink-0" />
              ) : (
                <FaRegCircle className="text-indigo-400 text-lg flex-shrink-0" />
              )}
              <span className={step.completed ? "line-through text-indigo-300/50" : "text-white"}>
                {step.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrainingScreen;

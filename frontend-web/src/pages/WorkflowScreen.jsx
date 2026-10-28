import React, { useState } from "react";
import { FaPlay, FaPlus, FaToggleOn, FaToggleOff } from "react-icons/fa";

const initialRules = [
  { id: 1, trigger: "When scan ends", action: "Upload standard JSON log to LIMS S3 folder", active: true },
  { id: 2, trigger: "When pitting anomaly > 15%", action: "Send Slack safety alert to @materials-lab channel", active: true },
  { id: 3, trigger: "When SCE calibration offset exceeds 5 mV", action: "Flag Potentiostat status as calibrated-warning", active: false }
];

function WorkflowScreen() {
  const [rules, setRules] = useState(initialRules);

  const toggleRule = (id) => {
    setRules(rules.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex justify-between items-center bg-[#0d1c4c] border border-cyan-400/20 p-4 rounded-xl">
        <h3 className="text-sm font-semibold text-white">Laboratory Automation Workflows</h3>
        <button className="px-3.5 py-2 btn-glass-cyan text-xs font-bold rounded flex items-center gap-1.5">
          <FaPlus /> Add Rule
        </button>
      </div>

      {/* Rules list */}
      <div className="glass-panel p-6 space-y-4">
        <h4 className="text-md font-bold text-cyan-400">Trigger Actions Registry</h4>
        
        <div className="space-y-3">
          {rules.map((rule) => (
            <div key={rule.id} className="flex justify-between items-center p-3.5 bg-white/5 border border-white/5 rounded-xl text-sm">
              <div>
                <p className="font-mono text-xs text-purple-300 font-bold">IF: {rule.trigger}</p>
                <p className="font-semibold text-white mt-1">THEN: {rule.action}</p>
              </div>
              
              <button onClick={() => toggleRule(rule.id)} className="text-2xl text-cyan-400 hover:opacity-80 transition-opacity">
                {rule.active ? <FaToggleOn className="text-green-400" /> : <FaToggleOff className="text-indigo-400/40" />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WorkflowScreen;

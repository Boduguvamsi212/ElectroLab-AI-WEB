import React, { useState } from "react";
import { FaPlus, FaTrash, FaSlidersH } from "react-icons/fa";

const defaultParams = [
  { name: "Dissolved Oxygen Level", unit: "ppm", defaultValue: "6.5" },
  { name: "Electrolyte Fluid Flow Velocity", unit: "m/s", defaultValue: "1.2" },
  { name: "Solution Chloride Content", unit: "g/L", defaultValue: "35.0" }
];

function CustomParametersScreen() {
  const [params, setParams] = useState(defaultParams);
  const [newName, setNewName] = useState("");
  const [newUnit, setNewUnit] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newName || !newUnit || !newValue) return;
    setParams([...params, { name: newName, unit: newUnit, defaultValue: newValue }]);
    setNewName("");
    setNewUnit("");
    setNewValue("");
  };

  const removeParam = (index) => {
    setParams(params.filter((_, idx) => idx !== index));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Intro */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-bold mb-2 text-gradient-cyan-purple">Custom Test Parameters</h3>
        <p className="text-indigo-200 text-sm">
          Define custom environmental or sample variables (e.g. solution velocity, dissolved oxygen, inhibitor concentration). These variables are parsed as additional input nodes to the AI prediction models.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        {/* Form to add custom params */}
        <div className="glass-panel p-6 space-y-4">
          <h4 className="text-md font-bold text-cyan-400 flex items-center gap-2">
            <FaPlus /> Add New Input parameter
          </h4>
          
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Parameter Name</label>
              <input
                type="text"
                placeholder="e.g. Dissolved oxygen concentration"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-indigo-300 block mb-1">Unit</label>
                <input
                  type="text"
                  placeholder="e.g. ppm, m/s"
                  value={newUnit}
                  onChange={(e) => setNewUnit(e.target.value)}
                  className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="text-xs text-indigo-300 block mb-1">Default Value</label>
                <input
                  type="text"
                  placeholder="e.g. 6.4"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2 text-white"
                />
              </div>
            </div>
            <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded font-bold text-sm hover:opacity-90 transition-opacity">
              Register Parameter
            </button>
          </form>
        </div>

        {/* List of custom params */}
        <div className="glass-panel p-6 space-y-4">
          <h4 className="text-md font-bold text-purple-400 flex items-center gap-2">
            <FaSlidersH /> Registered Parameters ({params.length})
          </h4>
          
          <div className="space-y-3.5">
            {params.map((p, idx) => (
              <div key={idx} className="flex justify-between items-center p-3.5 bg-white/5 border border-white/5 rounded-xl text-xs">
                <div>
                  <p className="font-semibold text-white">{p.name}</p>
                  <span className="text-[10px] text-indigo-300/50">Unit: {p.unit} • Default: {p.defaultValue}</span>
                </div>
                <button onClick={() => removeParam(idx)} className="text-red-400 hover:text-red-300 transition-colors p-1">
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomParametersScreen;

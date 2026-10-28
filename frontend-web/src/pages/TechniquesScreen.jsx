import React, { useState } from "react";
import { FaSlidersH, FaBolt, FaWaveSquare } from "react-icons/fa";

function TechniquesScreen() {
  const [selectedTechnique, setSelectedTechnique] = useState("Potentiodynamic Polarization");

  const techniquesList = [
    { name: "Potentiodynamic Polarization", icon: <FaBolt />, desc: "Linear sweep voltammetry to generate Tafel curves and evaluate corrosion rates." },
    { name: "Cyclic Voltammetry (CV)", icon: <FaWaveSquare />, desc: "Investigate oxidation-reduction reactions, film thickness, and passive layers." },
    { name: "Electrochemical Impedance Spectroscopy (EIS)", icon: <FaSlidersH />, desc: "AC frequency sweep to evaluate charge transfer resistance and coating degradation." }
  ];

  return (
    <div className="space-y-6">
      {/* Selector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {techniquesList.map((t, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedTechnique(t.name)}
            className={`glass-panel p-5 cursor-pointer border hover:border-cyan-400/50 transition-all ${
              selectedTechnique === t.name ? "bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-400" : "border-white/5"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl text-cyan-400">{t.icon}</span>
              <h4 className="font-bold text-white text-sm">{t.name}</h4>
            </div>
            <p className="text-xs text-indigo-300/80 leading-relaxed">{t.desc}</p>
          </div>
        ))}
      </div>

      {/* Configuration Form based on selection */}
      <div className="glass-panel p-6 space-y-4">
        <h3 className="text-lg font-bold text-gradient-cyan-purple">{selectedTechnique} Settings</h3>
        
        {selectedTechnique === "Potentiodynamic Polarization" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Initial Potential (V vs. Eoc)</label>
              <input type="number" defaultValue="-0.25" className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2 text-white font-mono" />
            </div>
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Final Potential (V vs. Eoc)</label>
              <input type="number" defaultValue="0.25" className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2 text-white font-mono" />
            </div>
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Scan Rate (mV/s)</label>
              <input type="number" defaultValue="0.166" className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2 text-white font-mono" />
            </div>
          </div>
        )}

        {selectedTechnique === "Cyclic Voltammetry (CV)" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Vertex 1 Potential (V)</label>
              <input type="number" defaultValue="-1.0" className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2 text-white font-mono" />
            </div>
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Vertex 2 Potential (V)</label>
              <input type="number" defaultValue="1.0" className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2 text-white font-mono" />
            </div>
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Number of Cycles</label>
              <input type="number" defaultValue="3" className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2 text-white font-mono" />
            </div>
          </div>
        )}

        {selectedTechnique === "Electrochemical Impedance Spectroscopy (EIS)" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Start Frequency (Hz)</label>
              <input type="number" defaultValue="100000" className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2 text-white font-mono" />
            </div>
            <div>
              <label className="text-xs text-indigo-300 block mb-1">End Frequency (Hz)</label>
              <input type="number" defaultValue="0.01" className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2 text-white font-mono" />
            </div>
            <div>
              <label className="text-xs text-indigo-300 block mb-1">AC Amplitude (mV RMS)</label>
              <input type="number" defaultValue="10" className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2 text-white font-mono" />
            </div>
          </div>
        )}

        <button className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded font-bold text-sm hover:opacity-95 transition-opacity">
          Load Parameters to Potentiostat
        </button>
      </div>
    </div>
  );
}

export default TechniquesScreen;

import React, { useState } from "react";
import { FaCalculator } from "react-icons/fa";

function CalculatorScreen() {
  const [current, setCurrent] = useState(1.24); // uA/cm2
  const [density, setDensity] = useState(7.87); // g/cm3
  const [eqWeight, setEqWeight] = useState(27.92); // g/eq
  const [corrosionRate, setCorrosionRate] = useState(0.57); // mpy

  const handleCalculate = (e) => {
    e.preventDefault();
    // Faraday calculation: rate (mpy) = 0.129 * Icorr * EqWeight / Density
    const rate = (0.129 * parseFloat(current) * parseFloat(eqWeight)) / parseFloat(density);
    setCorrosionRate(rate.toFixed(3));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Intro info */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-bold mb-2 text-gradient-cyan-purple">Faraday's Law Corrosion Rate Calculator</h3>
        <p className="text-indigo-200 text-sm">
          Convert measured corrosion current density (Icorr) to standard penetration depth rates (mpy or mm/yr) based on metal equivalent weights and density.
        </p>
      </div>

      {/* Grid forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input variables */}
        <div className="glass-panel p-6">
          <h4 className="text-md font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <FaCalculator /> Calculation Parameters
          </h4>
          <form onSubmit={handleCalculate} className="space-y-4 text-sm">
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Corrosion Current Density (Icorr, μA/cm²)</label>
              <input
                type="number"
                step="0.01"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white font-mono"
              />
            </div>
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Metal Density (g/cm³)</label>
              <input
                type="number"
                step="0.01"
                value={density}
                onChange={(e) => setDensity(e.target.value)}
                className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white font-mono"
              />
            </div>
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Metal Equivalent Weight (g/eq)</label>
              <input
                type="number"
                step="0.01"
                value={eqWeight}
                onChange={(e) => setEqWeight(e.target.value)}
                className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white font-mono"
              />
            </div>
            <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded font-bold text-sm hover:opacity-90 transition-opacity">
              Calculate Corrosion Rate
            </button>
          </form>
        </div>

        {/* Results output Card */}
        <div className="glass-panel p-6 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#0c1840] via-[#102360] to-[#1e1145]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-10" />
          
          <div>
            <h4 className="text-md font-bold text-purple-400 mb-4">Calculated Output Penetration</h4>
            <div className="space-y-4">
              <div>
                <span className="text-xs text-indigo-300 block">Penetration Rate (Mils per Year)</span>
                <span className="text-4xl font-black text-cyan-300 font-mono">{corrosionRate} mpy</span>
              </div>
              <div>
                <span className="text-xs text-indigo-300 block">Penetration Rate (mm/year)</span>
                <span className="text-2xl font-black text-white font-mono">{(corrosionRate * 0.0254).toFixed(4)} mm/yr</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalculatorScreen;

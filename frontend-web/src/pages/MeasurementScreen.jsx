import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../api/apiService";

const MATERIALS = [
  "Carbon Steel 1018",
  "Stainless Steel 316L",
  "Alloy C276 (Hastelloy)",
  "Titanium Grade 5",
  "Copper-Nickel 90/10",
];

function MeasurementScreen() {
  const navigate = useNavigate();
  const [material, setMaterial] = useState("Carbon Steel 1018");
  const [ph, setPh] = useState("7.15");
  const [initVoltage, setInitVoltage] = useState("-0.25");
  const [finalVoltage, setFinalVoltage] = useState("0.25");
  const [scanRate, setScanRate] = useState("0.166");
  const [temperature, setTemperature] = useState("25.0");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputCls = "w-full bg-[#1b2b62] border border-cyan-400/20 rounded-lg p-3 text-white font-mono placeholder-indigo-300/40 focus:outline-none focus:border-cyan-400 text-sm";
  const labelCls = "text-xs text-indigo-300 block mb-1.5";

  const handleStart = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await apiService.createMeasurement({
        material, pH: parseFloat(ph), initVoltage: parseFloat(initVoltage),
        finalVoltage: parseFloat(finalVoltage), scanRate: parseFloat(scanRate),
        temperature: parseFloat(temperature),
      });
      if (result) navigate("/graph");
    } catch (e) {
      setError("Sweep scan failed. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-1">
      {/* Title card */}
      <div className="glass-panel p-4">
        <h2 className="text-lg font-bold text-cyan-400">Electrochemical Measurement Configuration</h2>
        <p className="text-xs text-indigo-300 mt-1.5 leading-relaxed">
          Set electrode polarization voltage sweep limits, scanning rate, and electrolyte conditions.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-xs p-3 rounded-lg text-center">
          {error}
        </div>
      )}

      {/* Parameters card */}
      <div className="glass-panel p-4 space-y-4">
        <h3 className="text-base font-bold text-cyan-400">⚙  Potentiodynamic Parameter Setup</h3>

        <div>
          <label className={labelCls}>Target Alloy Material</label>
          <select value={material} onChange={e => setMaterial(e.target.value)}
            className={inputCls}>
            {MATERIALS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div>
          <label className={labelCls}>Electrolyte pH value</label>
          <input value={ph} onChange={e => setPh(e.target.value)} placeholder="7.15"
            type="number" step="0.01" className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>Initial Sweep Voltage (V vs OCP)</label>
          <input value={initVoltage} onChange={e => setInitVoltage(e.target.value)} placeholder="-0.25"
            type="number" step="0.01" className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>Final Sweep Voltage (V vs OCP)</label>
          <input value={finalVoltage} onChange={e => setFinalVoltage(e.target.value)} placeholder="0.25"
            type="number" step="0.01" className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>Scan Sweep Rate (mV/s)</label>
          <input value={scanRate} onChange={e => setScanRate(e.target.value)} placeholder="0.166"
            type="number" step="0.001" className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>Solution Temperature (°C)</label>
          <input value={temperature} onChange={e => setTemperature(e.target.value)} placeholder="25.0"
            type="number" step="0.1" className={inputCls} />
        </div>

        <button
          onClick={handleStart}
          disabled={loading}
          className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-bold text-[15px] hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
        >
          {loading ? "Running Sweep..." : "▶  Start Sweep Scan"}
        </button>
      </div>

      {/* Info card */}
      <div className="glass-panel p-4">
        <h3 className="text-sm font-bold text-white mb-2">ℹ  Experiment Info</h3>
        <ul className="text-xs text-indigo-300 space-y-1.5 leading-relaxed">
          <li>• Three-electrode polarization cell</li>
          <li>• Calculates polarization resistance (Rp)</li>
          <li>• ASTM-G5 Standard repeatability</li>
        </ul>
      </div>
    </div>
  );
}

export default MeasurementScreen;
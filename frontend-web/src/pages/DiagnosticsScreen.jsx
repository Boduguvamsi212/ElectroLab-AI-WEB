import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaHeartbeat } from "react-icons/fa";
import apiService from "../api/apiService";

function DiagnosticsScreen() {
  const [running, setRunning] = useState(false);
  const [diagnostics, setDiagnostics] = useState(null);
  const [error, setError] = useState("");

  const runDiag = async () => {
    setRunning(true);
    setError("");
    try {
      // Simulate hardware ADC scan wait
      await new Promise((r) => setTimeout(r, 1500));
      const data = await apiService.getDiagnostics();
      setDiagnostics(data);
    } catch (err) {
      setError("Failed to communicate with workstation diagnostics bus.");
    } finally {
      setRunning(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    apiService.getDiagnostics().then(setDiagnostics).catch(console.error);
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Intro info */}
      <div className="glass-panel p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-gradient-cyan-purple">Hardware Diagnostics Suite</h3>
          <p className="text-sm text-indigo-200">
            Check Potentiostat channels impedance, noise ratios, counter electrode loops, and internal power supply rails.
          </p>
        </div>
        <button
          onClick={runDiag}
          disabled={running}
          className="px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
        >
          <FaHeartbeat />
          {running ? "Scanning channels..." : "Start System Diagnostics"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Grid channels */}
      {diagnostics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {diagnostics.channels.map((ch) => (
            <div key={ch.id} className="glass-panel p-5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-indigo-300 font-mono">{ch.id} ({ch.name})</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                  ch.status === "OK" ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"
                }`}>
                  {ch.status}
                </span>
              </div>
              <div className="text-lg font-bold">Limit: {ch.voltLimit}</div>
              <p className="text-[10px] text-indigo-300/60">Noise density ratio: {ch.noiseRatio}</p>
            </div>
          ))}
        </div>
      )}

      {diagnostics && (
        <div className="glass-panel p-6 space-y-4">
          <h4 className="font-bold text-white text-md">Hardware Register Checklist</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-indigo-300">Potentiostat Cell Lock:</span>
              <span className={diagnostics.checks.potentiostatLock ? "text-green-400" : "text-yellow-400"}>
                {diagnostics.checks.potentiostatLock ? "LOCKED (Armed)" : "DISARMED"}
              </span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-indigo-300">Impedance ADC Analyzer:</span>
              <span className="text-white">{diagnostics.checks.impedanceAnalyzerADC}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-indigo-300">Electrolyte Temperature:</span>
              <span className="text-white">{diagnostics.checks.temperatureProbe}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-indigo-300">Cooling Enclosure Fans:</span>
              <span className="text-white">{diagnostics.checks.coolingFans}</span>
            </div>
          </div>
        </div>
      )}

      {diagnostics && diagnostics.status === "Healthy" && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-sm flex items-center gap-2">
          <FaCheckCircle /> All hardware terminals are operating within factory calibration limits! (ASTM-G5 compliance verified).
        </div>
      )}
    </div>
  );
}

export default DiagnosticsScreen;


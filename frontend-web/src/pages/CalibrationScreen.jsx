import React, { useState, useEffect } from "react";
import { FaWrench, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import apiService from "../api/apiService";

function CalibrationScreen() {
  const [logs, setLogs] = useState([]);
  const [electrode, setElectrode] = useState("Saturated Calomel Electrode (SCE)");
  const [offset, setOffset] = useState("1.24");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Load active user details from local storage or defaults
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : { name: "Dr. Alex Carter" };

  const loadData = async () => {
    try {
      const data = await apiService.getCalibrations();
      setLogs(data);
    } catch (err) {
      console.error("Failed to load calibrations", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCalibrate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const slope = (98 + Math.random() * 2.0).toFixed(1) + "%";
      await apiService.createCalibration({
        electrode,
        offset: `${parseFloat(offset) / 1000} V`,
        slope,
        operator: user.name
      });
      loadData();
    } catch (err) {
      console.error("Calibration error", err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-64 text-cyan-400">
        <span className="animate-spin text-2xl mr-2">⚛</span> Loading Calibration Logs...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Intro */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-bold mb-2 text-gradient-cyan-purple">Electrochemical Electrode Calibration</h3>
        <p className="text-indigo-200 text-sm">
          Calibrate reference electrode offsets vs. standard hydrogen electrodes (SHE). Correct potential measurements to prevent drifts in Ecorr readings caused by temperature variation or salt bridge leaks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Setup configuration */}
        <form onSubmit={handleCalibrate} className="glass-panel p-6 space-y-4">
          <h4 className="text-md font-bold text-cyan-400">Reference Electrode Configuration</h4>
          <div className="space-y-3.5 text-sm">
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Electrode Compound Type</label>
              <select 
                value={electrode}
                onChange={(e) => setElectrode(e.target.value)}
                className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Saturated Calomel Electrode (SCE)">Saturated Calomel Electrode (SCE) • +0.242 V vs SHE</option>
                <option value="Silver-Silver Chloride (Ag/AgCl)">Silver-Silver Chloride (Ag/AgCl) • +0.197 V vs SHE</option>
                <option value="Reversible Hydrogen Electrode (RHE)">Reversible Hydrogen Electrode (RHE) • 0.000 V vs SHE</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Measured Cell Zero Offset (mV)</label>
              <input 
                type="number" 
                step="0.01"
                value={offset}
                onChange={(e) => setOffset(e.target.value)}
                className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white font-mono focus:outline-none focus:border-cyan-400" 
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded font-bold text-sm hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? "Scanning sensor cell..." : "Execute Zero Calibration Scan"}
          </button>
        </form>

        {/* Status card */}
        <div className="glass-panel p-6 flex flex-col space-y-4">
          <h4 className="text-md font-bold text-purple-400">Calibration Logs</h4>
          <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2 sidebar-scroll">
            {logs.map((log) => {
              const date = new Date(log.timestamp).toLocaleDateString("en-US", {
                month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
              });
              return (
                <div key={log.id} className="p-3 bg-white/5 border border-white/5 rounded-lg text-xs space-y-1">
                  <div className="flex justify-between font-bold text-white">
                    <span>{log.electrode}</span>
                    <span className="text-green-400 font-mono">{log.slope} Slope</span>
                  </div>
                  <div className="flex justify-between text-indigo-300/80">
                    <span>Offset: {log.offset} | Operator: {log.operator}</span>
                    <span>{date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalibrationScreen;


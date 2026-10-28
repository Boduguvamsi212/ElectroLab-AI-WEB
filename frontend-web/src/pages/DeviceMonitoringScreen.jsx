import React, { useState, useEffect, useRef } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { FaPlay, FaPause, FaCamera, FaCheckCircle, FaMicrochip } from "react-icons/fa";
import apiService from "../api/apiService";

function DeviceMonitoringScreen() {
  const [stream, setStream] = useState([]);
  const [current, setCurrent] = useState({
    voltage: -0.342,
    current: 4.85,
    currentDensity: 5.10,
    temp: 25.1,
    ph: 7.15,
    ocp: -0.380,
    irDropMv: 0.58,
    noiseRmsUv: 12.4,
    channelStatus: "ACQUIRING"
  });
  const [isStreaming, setIsStreaming] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(1200);
  const [selectedMaterial, setSelectedMaterial] = useState("Carbon Steel 1018");
  const [recording, setRecording] = useState(false);
  const [recordSuccess, setRecordSuccess] = useState(null);
  const streamRef = useRef(isStreaming);

  useEffect(() => {
    streamRef.current = isStreaming;
  }, [isStreaming]);

  useEffect(() => {
    let timer = null;

    const fetchTelemetry = async () => {
      if (!streamRef.current) return;
      try {
        const data = await apiService.getRealtimeTelemetry();
        if (data && data.current) {
          setCurrent(data.current);
          setStream(prev => {
            const next = [...prev, data.current];
            return next.length > 20 ? next.slice(next.length - 20) : next;
          });
        }
      } catch (err) {
        console.warn("Live telemetry tick fallback", err);
      }
    };

    fetchTelemetry();
    timer = setInterval(fetchTelemetry, refreshInterval);

    return () => clearInterval(timer);
  }, [refreshInterval]);

  const handleRecordLive = async () => {
    setRecording(true);
    setRecordSuccess(null);
    try {
      const res = await apiService.recordRealtimeMeasurement({
        material: selectedMaterial,
        pH: current.ph || 7.15,
        temperature: current.temp || 25.0
      });
      if (res) {
        setRecordSuccess(`Recorded Run ${res.runNumber} (${res.material}) — ${res.rate}`);
        setTimeout(() => setRecordSuccess(null), 5000);
      }
    } catch (err) {
      console.error("Failed to record snapshot", err);
    } finally {
      setRecording(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Telemetry Header & Stream Controller */}
      <div className="glass-panel p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <span className={`w-3 h-3 rounded-full ${isStreaming ? "bg-green-400 animate-ping" : "bg-yellow-400"}`} />
            <h2 className="text-xl font-black text-cyan-400 tracking-wide flex items-center gap-2">
              <FaMicrochip /> Live Potentiostat Telemetry Stream
            </h2>
          </div>
          <p className="text-xs text-indigo-300">
            Real-time three-electrode electrochemical sensor data acquisition • Channel 1 (Active)
          </p>
        </div>

        {/* Live Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 transition-all ${
              isStreaming
                ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 hover:bg-yellow-500/30"
                : "bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30"
            }`}
          >
            {isStreaming ? <><FaPause /> Pause Live Feed</> : <><FaPlay /> Resume Live Feed</>}
          </button>

          <select
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(Number(e.target.value))}
            className="bg-[#1b2b62] border border-cyan-400/20 rounded-lg px-3 py-2 text-xs text-cyan-300 focus:outline-none focus:border-cyan-400"
          >
            <option value={800}>Fast (0.8s)</option>
            <option value={1200}>Normal (1.2s)</option>
            <option value={2500}>Smooth (2.5s)</option>
          </select>
        </div>
      </div>

      {recordSuccess && (
        <div className="bg-green-500/15 border border-green-500/40 text-green-300 text-xs p-3 rounded-xl flex items-center gap-2 animate-fade-in">
          <FaCheckCircle className="text-sm" />
          <span>{recordSuccess}</span>
        </div>
      )}

      {/* Real-Time Live KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Working Electrode Potential */}
        <div className="glass-panel p-4 space-y-1 relative overflow-hidden">
          <span className="text-[10px] text-indigo-300 font-mono tracking-wider">WORKING ELECTRODE (Ewe)</span>
          <div className="text-2xl font-black text-cyan-400 font-mono">
            {current.voltage ? `${current.voltage.toFixed(3)} V` : "-0.342 V"}
          </div>
          <div className="flex justify-between items-center text-[10px] text-indigo-300/70">
            <span>vs. SCE Ref</span>
            <span className="text-green-400">Stable</span>
          </div>
        </div>

        {/* Current Density */}
        <div className="glass-panel p-4 space-y-1 relative overflow-hidden">
          <span className="text-[10px] text-indigo-300 font-mono tracking-wider">CORROSION CURRENT DENSITY</span>
          <div className="text-2xl font-black text-purple-400 font-mono">
            {current.currentDensity ? `${current.currentDensity.toFixed(2)} µA/cm²` : "5.10 µA/cm²"}
          </div>
          <div className="flex justify-between items-center text-[10px] text-indigo-300/70">
            <span>Cell: {current.current ? `${current.current.toFixed(2)} mA` : "4.85 mA"}</span>
            <span className="text-cyan-400">Active</span>
          </div>
        </div>

        {/* Solution Temp & pH */}
        <div className="glass-panel p-4 space-y-1 relative overflow-hidden">
          <span className="text-[10px] text-indigo-300 font-mono tracking-wider">SOLUTION CONDITIONS</span>
          <div className="text-2xl font-black text-yellow-400 font-mono">
            {current.temp ? `${current.temp.toFixed(1)} °C` : "25.1 °C"}
          </div>
          <div className="flex justify-between items-center text-[10px] text-indigo-300/70">
            <span>pH: {current.ph || "7.15"}</span>
            <span className="text-green-400">Calibrated</span>
          </div>
        </div>

        {/* OCP Drift & Noise */}
        <div className="glass-panel p-4 space-y-1 relative overflow-hidden">
          <span className="text-[10px] text-indigo-300 font-mono tracking-wider">OCP BASELINE & NOISE</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {current.ocp ? `${current.ocp.toFixed(3)} V` : "-0.380 V"}
          </div>
          <div className="flex justify-between items-center text-[10px] text-indigo-300/70">
            <span>Noise: {current.noiseRmsUv || "12.4"} µV</span>
            <span>IR: {current.irDropMv || "0.58"} mV</span>
          </div>
        </div>
      </div>

      {/* Live Waveform Graphs */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Real-time Potential Curve */}
        <div className="glass-panel p-5 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              Live Electrode Potential E(t) [V vs. Ref]
            </h3>
            <span className="text-[11px] text-indigo-300 font-mono">Last 20 Samples</span>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stream}>
                <defs>
                  <linearGradient id="liveVoltColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1b2b62" />
                <XAxis dataKey="time" stroke="#a5b4fc" tick={{ fontSize: 10 }} />
                <YAxis stroke="#a5b4fc" domain={["auto", "auto"]} tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "#0c1840", borderColor: "#06b6d4", color: "#fff", fontSize: 11 }} />
                <Area type="monotone" dataKey="voltage" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#liveVoltColor)" name="Potential (V)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real-time Current Density Curve */}
        <div className="glass-panel p-5 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-purple-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              Live Corrosion Current Output I(t) [µA/cm²]
            </h3>
            <span className="text-[11px] text-indigo-300 font-mono">Real-Time Waveform</span>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stream}>
                <defs>
                  <linearGradient id="liveCurrColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1b2b62" />
                <XAxis dataKey="time" stroke="#a5b4fc" tick={{ fontSize: 10 }} />
                <YAxis stroke="#a5b4fc" domain={["auto", "auto"]} tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "#0c1840", borderColor: "#a855f7", color: "#fff", fontSize: 11 }} />
                <Area type="monotone" dataKey="currentDensity" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#liveCurrColor)" name="Current Density (µA/cm²)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Snapshot Commitment Panel */}
      <div className="glass-panel p-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 justify-center md:justify-start">
              <FaCamera className="text-cyan-400" /> Commit Live Snapshot as Experiment Measurement
            </h4>
            <p className="text-xs text-indigo-300">
              Save current real-time telemetry state into the database for immediate Tafel extrapolation and AI risk prediction.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="bg-[#1b2b62] border border-cyan-400/20 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="Carbon Steel 1018">Carbon Steel 1018</option>
              <option value="Stainless Steel 316L">Stainless Steel 316L</option>
              <option value="Alloy C276 (Hastelloy)">Alloy C276 (Hastelloy)</option>
              <option value="Titanium Grade 5">Titanium Grade 5</option>
              <option value="Copper-Nickel 90/10">Copper-Nickel 90/10</option>
            </select>

            <button
              onClick={handleRecordLive}
              disabled={recording}
              className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-bold text-xs hover:opacity-90 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-50 whitespace-nowrap"
            >
              <FaCamera /> {recording ? "Committing..." : "Record Live Snapshot"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeviceMonitoringScreen;

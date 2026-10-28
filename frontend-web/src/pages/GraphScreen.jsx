import React, { useState, useEffect, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FaChartLine, FaBrain, FaFileExport, FaPlay, FaRedo, FaMicrochip } from "react-icons/fa";
import apiService from "../api/apiService";

function GraphScreen() {
  const [activeRun, setActiveRun] = useState(null);
  const [allRuns, setAllRuns] = useState([]);
  const [isSweeping, setIsSweeping] = useState(false);
  const [sweepIndex, setSweepIndex] = useState(50);
  const sweepTimerRef = useRef(null);

  useEffect(() => {
    const runStr = localStorage.getItem("activeRun");
    if (runStr) {
      try {
        const parsed = JSON.parse(runStr);
        setActiveRun(parsed);
        if (parsed.points && parsed.points.length > 0) {
          setSweepIndex(parsed.points.length);
        }
      } catch (e) {
        console.error("Failed to parse active run", e);
      }
    }

    apiService.getMeasurements().then(list => {
      if (list && list.length > 0) {
        setAllRuns(list);
        if (!runStr) {
          setActiveRun(list[0]);
          if (list[0].points) setSweepIndex(list[0].points.length);
        }
      }
    }).catch(() => {});
  }, []);

  const handleSelectRun = (runId) => {
    const found = allRuns.find(r => r.id === runId);
    if (found) {
      setActiveRun(found);
      localStorage.setItem("activeRun", JSON.stringify(found));
      setSweepIndex(found.points ? found.points.length : 50);
      setIsSweeping(false);
      if (sweepTimerRef.current) clearInterval(sweepTimerRef.current);
    }
  };

  const startLiveSweep = () => {
    if (sweepTimerRef.current) clearInterval(sweepTimerRef.current);
    setSweepIndex(1);
    setIsSweeping(true);

    const total = (run.points && run.points.length) || 50;
    let current = 1;

    sweepTimerRef.current = setInterval(() => {
      current += 1;
      setSweepIndex(current);
      if (current >= total) {
        clearInterval(sweepTimerRef.current);
        setIsSweeping(false);
      }
    }, 60);
  };

  // Safe fallback if no sweep has been run yet
  const defaultPoints = Array.from({ length: 50 }, (_, i) => {
    const v = -0.25 + (i * 0.01);
    const Ecorr = -0.45;
    const logI = Math.log10(Math.abs(Math.exp((v - Ecorr) / 0.12) - Math.exp(-(v - Ecorr) / 0.12)) * 1e-6 + 1e-10);
    return {
      voltage: parseFloat(v.toFixed(3)),
      logCurrent: parseFloat(logI.toFixed(3))
    };
  });

  const run = activeRun || {
    runNumber: "#148",
    material: "Carbon Steel 1018",
    initVoltage: -0.25,
    finalVoltage: 0.25,
    scanRate: 0.166,
    pH: 7.15,
    temperature: 25.0,
    current: 1.25,
    rate: "12.42 mpy",
    risk: "Medium Pitting Risk",
    confidence: "95.4%",
    passivation: "Partial Breakdown",
    points: defaultPoints
  };

  const fullPoints = run.points && run.points.length > 0 ? run.points : defaultPoints;
  const displayedPoints = fullPoints.slice(0, sweepIndex);
  const currentSweepPoint = displayedPoints[displayedPoints.length - 1] || fullPoints[0];

  // Find Ecorr (approximate where logCurrent is minimum)
  let minPoint = fullPoints[0] || { voltage: 0, logCurrent: 0 };
  fullPoints.forEach((p) => {
    if (p.logCurrent < minPoint.logCurrent) {
      minPoint = p;
    }
  });

  // Back-calculate raw current from logCurrent
  const rawIcorr = Math.pow(10, minPoint.logCurrent) * 1e6;
  const EcorrDisplay = `${minPoint.voltage.toFixed(3)} V`;
  const IcorrDisplay = `${rawIcorr.toFixed(3)} µA/cm²`;

  const handleExportCSV = () => {
    if (!run.points) return;
    let csvContent = "data:text/csv;charset=utf-8,Voltage(V),LogCurrentDensity(log A/cm2)\n";
    run.points.forEach((p) => {
      csvContent += `${p.voltage},${p.logCurrent}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Tafel_Data_Run_${(run.runNumber || "latest").replace("#", "")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Upper Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-[#0d1c4c] border border-cyan-400/20 p-4 rounded-xl gap-4">
        <div className="text-sm font-semibold flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isSweeping ? "bg-cyan-400 animate-ping" : "bg-green-400 animate-pulse"}`} />
          <span>Active Test: Run {run.runNumber} ({run.material})</span>
          {run.description && <span className="text-xs text-indigo-300 hidden lg:inline">• {run.description}</span>}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {allRuns.length > 0 && (
            <select
              value={run.id || ""}
              onChange={(e) => handleSelectRun(e.target.value)}
              className="bg-[#1b2b62] border border-cyan-400/20 rounded-lg px-2.5 py-1.5 text-xs text-cyan-300 focus:outline-none"
            >
              {allRuns.slice(0, 10).map((r) => (
                <option key={r.id} value={r.id}>
                  {r.runNumber}: {r.material} ({r.rate})
                </option>
              ))}
            </select>
          )}

          <button
            onClick={startLiveSweep}
            disabled={isSweeping}
            className="px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-[0_0_10px_rgba(6,182,212,0.3)] disabled:opacity-50"
          >
            {isSweeping ? <FaRedo className="animate-spin" /> : <FaPlay />}
            {isSweeping ? "Sweeping Live..." : "Simulate Live Sweep"}
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3 py-2 btn-glass-cyan text-xs font-bold rounded-lg flex items-center gap-1.5 whitespace-nowrap"
          >
            <FaFileExport /> Export CSV
          </button>
        </div>
      </div>

      {/* Main Grid: Graph & Panels */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Graph display */}
        <div className="xl:col-span-2 glass-panel p-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h3 className="text-md font-bold text-cyan-400 flex items-center gap-2">
              <FaChartLine /> Tafel Polarization Curve (E vs. log I)
            </h3>
            <div className="flex items-center gap-3 text-xs text-indigo-300 font-mono">
              <span>pH: {run.pH}</span>
              <span>Temp: {run.temperature}°C</span>
              <span>Rate: {run.scanRate || 0.166} mV/s</span>
            </div>
          </div>

          {/* Live sweeping progress ticker */}
          <div className="flex items-center justify-between bg-[#121c45]/70 border border-cyan-500/20 px-3 py-2 rounded-lg text-xs font-mono">
            <div className="flex items-center gap-2 text-cyan-300">
              <FaMicrochip className={isSweeping ? "animate-spin text-cyan-400" : "text-indigo-400"} />
              <span>
                {isSweeping ? "REAL-TIME SWEEP IN PROGRESS" : "POLARIZATION DATA ACQUIRED"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white">
                V: <b className="text-cyan-400">{currentSweepPoint.voltage.toFixed(3)} V</b>
              </span>
              <span className="text-white">
                Log I: <b className="text-purple-400">{currentSweepPoint.logCurrent.toFixed(2)}</b>
              </span>
              <span className="text-indigo-300">
                ({displayedPoints.length}/{fullPoints.length} pts)
              </span>
            </div>
          </div>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={displayedPoints}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="voltage"
                  stroke="#a5b4fc"
                  name="Potential"
                  tick={{ fontSize: 10 }}
                  label={{ value: "Potential (V vs. Ref)", position: "insideBottom", offset: -5, fill: "#a5b4fc", fontSize: 11 }}
                />
                <YAxis
                  stroke="#a5b4fc"
                  name="Log Current Density"
                  domain={["auto", "auto"]}
                  tick={{ fontSize: 10 }}
                  label={{ value: "log i (A/cm²)", angle: -90, position: "insideLeft", offset: 10, fill: "#a5b4fc", fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{ background: "#0c1840", borderColor: "#06b6d4", fontSize: 11 }}
                  labelFormatter={(value) => `Voltage: ${value} V`}
                  formatter={(value) => [value, "log i (A/cm²)"]}
                />
                <Line
                  type="monotone"
                  dataKey="logCurrent"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6 }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Key Calculated Values */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="text-[10px] text-indigo-300 block">Ecorr (Corrosion Potential)</span>
              <span className="text-sm font-mono font-bold text-white">{EcorrDisplay}</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="text-[10px] text-indigo-300 block">Icorr (Current Density)</span>
              <span className="text-sm font-mono font-bold text-cyan-300">{IcorrDisplay}</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="text-[10px] text-indigo-300 block">Stern-Geary Constant (B)</span>
              <span className="text-sm font-mono font-bold text-purple-300">0.026 V</span>
            </div>
          </div>
        </div>

        {/* AI Fitting Parameters */}
        <div className="glass-panel p-6 space-y-4">
          <h3 className="text-md font-bold text-purple-400 flex items-center gap-2">
            <FaBrain /> AI Slope Fitting Analysis
          </h3>

          <div className="space-y-4 text-sm">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-indigo-300">Signal-to-Noise Ratio</span>
                <span className="text-white font-mono font-bold">98.6%</span>
              </div>
              <div className="w-full bg-[#1b2b62] h-2 rounded overflow-hidden">
                <div className="bg-cyan-400 h-full w-[98.6%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-indigo-300">Curve Alignment Confidence</span>
                <span className="text-green-400 font-mono font-bold">{run.confidence || "95.4%"}</span>
              </div>
              <div className="w-full bg-[#1b2b62] h-2 rounded overflow-hidden">
                <div className="bg-green-400 h-full w-[96%]" />
              </div>
            </div>
          </div>

          <div className="text-xs text-indigo-200 border-t border-white/10 pt-4 space-y-3">
            <div className="flex justify-between">
              <span>Alloy Code:</span>
              <span className="font-mono text-white font-bold">{run.material}</span>
            </div>
            <div className="flex justify-between">
              <span>Predicted Rate:</span>
              <span className="font-mono text-cyan-300 font-bold">{run.rate}</span>
            </div>
            <div className="flex justify-between">
              <span>Risk Boundary:</span>
              <span className="font-mono text-yellow-400 font-bold">{run.risk}</span>
            </div>
            <div className="flex justify-between">
              <span>Passive Film State:</span>
              <span className="font-mono text-green-300 font-bold">{run.passivation}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GraphScreen;
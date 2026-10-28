import React, { useState } from "react";
import { FaPrint, FaFilePdf, FaCheck, FaExclamationTriangle } from "react-icons/fa";

function FinalResultScreen() {
  const [signedOff, setSignedOff] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Action Header */}
      <div className="flex justify-between items-center bg-[#0d1c4c] border border-cyan-400/20 p-4 rounded-xl">
        <div className="text-sm font-semibold">Report Status: {signedOff ? "✅ Approved & Signed" : "⚠️ Awaiting Sign-Off"}</div>
        <div className="flex gap-2">
          <button onClick={handlePrint} className="px-3.5 py-2 btn-glass-cyan text-xs font-bold rounded flex items-center gap-1.5">
            <FaPrint /> Print Report
          </button>
          <button className="px-3.5 py-2 btn-glass-purple text-xs font-bold rounded flex items-center gap-1.5">
            <FaFilePdf /> Export PDF
          </button>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div className="glass-panel p-8 space-y-6 border border-cyan-400/20 relative shadow-2xl overflow-hidden bg-[#0a1438] print:bg-white print:text-black">
        {/* Laboratory Letterhead */}
        <div className="border-b border-cyan-400/20 pb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-wider text-cyan-400 font-mono">ELECTROLAB CORROSION LABS</h1>
            <p className="text-xs text-indigo-300">Electrochemical Polarization Test Report</p>
          </div>
          <div className="text-right sm:text-right text-xs text-indigo-300 font-mono">
            <div>Report ID: EXP-2026-148</div>
            <div>Date: July 14, 2026</div>
          </div>
        </div>

        {/* Experiment Specs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-white/5 p-4 rounded-lg">
          <div>
            <span className="text-xs text-indigo-300 block">Operator</span>
            <span className="font-semibold text-white">Dr. Alex Carter</span>
          </div>
          <div>
            <span className="text-xs text-indigo-300 block">Material</span>
            <span className="font-semibold text-white font-mono">Carbon Steel 1018</span>
          </div>
          <div>
            <span className="text-xs text-indigo-300 block">Solution</span>
            <span className="font-semibold text-white">3.5% NaCl • pH 7.2</span>
          </div>
          <div>
            <span className="text-xs text-indigo-300 block">Temp</span>
            <span className="font-semibold text-white">25.0 °C</span>
          </div>
        </div>

        {/* Primary Calculations Results */}
        <div className="space-y-4">
          <h4 className="text-md font-bold text-cyan-400 border-b border-cyan-400/10 pb-2">Analysis Results & Calculation SUMMARY</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-cyan-950/20 border border-cyan-400/20 rounded-xl">
              <span className="text-xs text-indigo-300 block">Corrosion Rate (mpy)</span>
              <span className="text-3xl font-black text-cyan-300 font-mono">12.42</span>
              <p className="text-[10px] text-green-400 mt-1">Status: Moderate Corrosion</p>
            </div>

            <div className="p-4 bg-purple-950/20 border border-purple-500/20 rounded-xl">
              <span className="text-xs text-indigo-300 block">Corrosion Potential (Ecorr)</span>
              <span className="text-3xl font-black text-purple-300 font-mono">-0.482 V</span>
              <p className="text-[10px] text-indigo-300/60 mt-1">vs. SCE reference</p>
            </div>

            <div className="p-4 bg-indigo-950/20 border border-indigo-500/20 rounded-xl">
              <span className="text-xs text-indigo-300 block">Polarization Resistance (Rp)</span>
              <span className="text-3xl font-black text-indigo-300 font-mono">2.18 kΩ</span>
              <p className="text-[10px] text-indigo-300/60 mt-1">Calculated via Stern-Geary</p>
            </div>
          </div>
        </div>

        {/* Model parameters used */}
        <div className="space-y-3">
          <h4 className="text-md font-bold text-cyan-400 border-b border-cyan-400/10 pb-2">Fitting Coefficients</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono text-indigo-200">
            <div>Anodic Slope (βa) : 0.082 V/dec</div>
            <div>Cathodic Slope (βc) : 0.124 V/dec</div>
            <div>Density : 7.87 g/cm³</div>
            <div>Eq. Weight : 27.92 g/eq</div>
          </div>
        </div>

        {/* Sign off and notes */}
        <div className="border-t border-cyan-400/20 pt-6 flex flex-col sm:flex-row justify-between items-end gap-6">
          <div className="space-y-1">
            <span className="text-xs text-indigo-300 font-semibold block">Laboratory Notes</span>
            <p className="text-xs text-indigo-300/70 max-w-md">
              The anodic polarization curves show slight concentration polarization. The AI prediction closely matches traditional gravimetric testing data (deviation of 3.2%).
            </p>
          </div>

          <div className="flex flex-col items-center">
            {signedOff ? (
              <div className="text-center font-mono space-y-1">
                <div className="text-green-400 font-bold border border-green-500/40 px-4 py-1.5 rounded-lg bg-green-500/5">
                  SIGNED OFF BY CARTER
                </div>
                <span className="text-[9px] text-indigo-300/40">Timestamp: 2026-07-14 16:01 UTC</span>
              </div>
            ) : (
              <button
                onClick={() => setSignedOff(true)}
                className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold text-sm hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                Approve & Sign Report
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinalResultScreen;

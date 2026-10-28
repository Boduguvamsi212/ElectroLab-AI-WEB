import React from "react";
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from "react-icons/fa";

const standardTests = [
  { spec: "ASTM G5 reference steel polarization curve", tolerance: "Within 5% deviation", status: "Pass" },
  { spec: "Counter electrode Pt impedance bounds", tolerance: "< 10 Ω offset", status: "Pass" },
  { spec: "Reference electrode drift rate (24h)", tolerance: "< 2.0 mV variance", status: "Warning" }
];

function QualityControlScreen() {
  return (
    <div className="space-y-6">
      {/* Intro info */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-bold mb-2 text-gradient-cyan-purple">Standard Calibration Quality Control</h3>
        <p className="text-indigo-200 text-sm">
          Validate electrochemical sweep calculations against standard references (e.g. ASTM G5 test specs). Maintain audit compliance for accredited testing facilities.
        </p>
      </div>

      {/* Verification lists */}
      <div className="glass-panel p-6 overflow-x-auto">
        <h4 className="text-md font-bold mb-4 text-cyan-400">Accreditation QC Verification Check</h4>
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-cyan-400/20 text-indigo-300">
              <th className="py-2">Standard Spec</th>
              <th className="py-2">Allowed Tolerance Limit</th>
              <th className="py-2">Current Reading Variance</th>
              <th className="py-2 text-right">Verification Status</th>
            </tr>
          </thead>
          <tbody>
            {standardTests.map((t, idx) => (
              <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-3 font-semibold text-white">{t.spec}</td>
                <td className="py-3 text-indigo-200">{t.tolerance}</td>
                <td className="py-3 text-cyan-300 font-mono">
                  {t.status === "Pass" ? "1.4% variance" : "3.1 mV drift"}
                </td>
                <td className="py-3 text-right">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    t.status === "Pass" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                  }`}>
                    {t.status === "Pass" ? <FaCheckCircle /> : <FaExclamationTriangle />}
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QualityControlScreen;

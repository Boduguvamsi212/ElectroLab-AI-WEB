import React from "react";
import { FaFilePdf, FaFileCsv, FaEnvelope, FaDownload, FaPrint } from "react-icons/fa";

const reports = [
  { id: 147, date: "2026-07-14", desc: "EXP-147 Steel Corrosion Suite" },
  { id: 146, date: "2026-07-12", desc: "EXP-146 Aluminum Passivation sweep" },
  { id: 145, date: "2026-07-09", desc: "EXP-145 Copper Tafel calibration" }
];

function ReportsScreen() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Cards actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel p-6 text-center border border-cyan-400/20 hover:border-cyan-400/50 transition-all cursor-pointer">
          <FaFilePdf className="text-4xl text-cyan-400 mx-auto mb-3" />
          <h4 className="font-bold text-white text-sm">PDF Report</h4>
          <p className="text-[10px] text-indigo-300/60 mt-1">Export comprehensive calculation summary reports.</p>
        </div>

        <div className="glass-panel p-6 text-center border border-green-500/20 hover:border-green-500/50 transition-all cursor-pointer">
          <FaFileCsv className="text-4xl text-green-400 mx-auto mb-3" />
          <h4 className="font-bold text-white text-sm">CSV Export</h4>
          <p className="text-[10px] text-indigo-300/60 mt-1">Download raw electrochemical curve points array.</p>
        </div>

        <div className="glass-panel p-6 text-center border border-purple-500/20 hover:border-purple-500/50 transition-all cursor-pointer">
          <FaEnvelope className="text-4xl text-purple-400 mx-auto mb-3" />
          <h4 className="font-bold text-white text-sm">Email Report</h4>
          <p className="text-[10px] text-indigo-300/60 mt-1">Send zipped research runs direct to core team members.</p>
        </div>
      </div>

      {/* Reports lists */}
      <div className="glass-panel p-6 space-y-4">
        <h3 className="text-md font-bold text-cyan-400">Available Laboratory Reports</h3>
        <div className="space-y-3">
          {reports.map((report) => (
            <div key={report.id} className="flex justify-between items-center p-3.5 bg-white/5 border border-white/5 rounded-xl text-sm">
              <div>
                <p className="font-semibold text-white">Report #{report.id}</p>
                <span className="text-[10px] text-indigo-300/60">{report.desc} • {report.date}</span>
              </div>
              
              <div className="flex gap-2">
                <button className="p-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-xs text-indigo-300 hover:text-white transition-colors">
                  <FaDownload />
                </button>
                <button className="p-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-xs text-indigo-300 hover:text-white transition-colors">
                  <FaPrint />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReportsScreen;
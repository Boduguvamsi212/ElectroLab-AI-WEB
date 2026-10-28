import React from "react";
import { FaHistory, FaUser, FaSlidersH, FaFileAlt } from "react-icons/fa";

const auditLogs = [
  { id: 1, action: "User Login", user: "Dr. Alex Carter", detail: "Session started from IP 192.168.1.146", time: "July 14, 2026 15:51" },
  { id: 2, action: "Zero-Calibration", user: "Dr. Alex Carter", detail: "SCE reference electrode zero offset calibrated to +1.24 mV", time: "July 14, 2026 15:55" },
  { id: 3, action: "Experiment Completed", user: "Sarah Jenkins", detail: "Tafel sweep completed for Carbon Steel Sample (EXP-2026-148)", time: "July 14, 2026 15:58" },
  { id: 4, action: "Report Exported", user: "Sarah Jenkins", detail: "PDF report exported for EXP-2026-148", time: "July 14, 2026 16:01" }
];

function AuditTrailScreen() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Intro */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-bold mb-2 text-gradient-cyan-purple">Compliance Audit Trail Log</h3>
        <p className="text-indigo-200 text-sm">
          A secure, read-only list of all workstation activity. Tracks calibration overrides, experiment sweeps, reports generation, and login configurations.
        </p>
      </div>

      {/* Timeline logs list */}
      <div className="glass-panel p-6 space-y-6">
        <h4 className="text-md font-bold text-cyan-400 flex items-center gap-2">
          <FaHistory /> Audit Log History
        </h4>
        
        <div className="relative border-l border-cyan-400/20 pl-6 ml-3 space-y-6">
          {auditLogs.map((log) => (
            <div key={log.id} className="relative">
              {/* Timeline marker */}
              <span className="absolute -left-[31px] top-1 bg-[#091336] p-1 rounded-full border border-cyan-400/40 text-cyan-400 text-xs">
                {log.action === "User Login" && <FaUser />}
                {log.action === "Zero-Calibration" && <FaSlidersH />}
                {log.action === "Experiment Completed" && <FaFileAlt />}
                {log.action === "Report Exported" && <FaFileAlt />}
              </span>
              
              <div>
                <span className="text-[10px] text-indigo-300/50 font-mono block">{log.time}</span>
                <p className="text-sm font-semibold text-white mt-0.5">{log.action}</p>
                <p className="text-xs text-indigo-200 mt-1">{log.detail}</p>
                <span className="text-[10px] text-cyan-400/80 font-mono mt-1 block">Performed by: {log.user}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AuditTrailScreen;

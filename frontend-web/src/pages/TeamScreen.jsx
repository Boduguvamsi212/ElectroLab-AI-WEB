import React from "react";
import { FaUserCircle, FaEnvelope, FaShieldAlt } from "react-icons/fa";

const teamMembers = [
  { name: "Dr. Alex Carter", role: "Lead Materials Chemist", email: "alex.carter@metallurgical-inst.edu", status: "Active", level: "Admin" },
  { name: "Sarah Jenkins", role: "Lab Research Assistant", email: "sarah.j@metallurgical-inst.edu", status: "Active", level: "Operator" },
  { name: "Marcus Aurelius", role: "Data Integrity Specialist", email: "marcus.a@metallurgical-inst.edu", status: "Away", level: "Operator" },
  { name: "Emily Watson", role: "System Administrator", email: "e.watson@metallurgical-inst.edu", status: "Offline", level: "Admin" }
];

function TeamScreen() {
  return (
    <div className="space-y-6">
      {/* Intro header */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-bold mb-2 text-gradient-cyan-purple">Research Team & Operator Access</h3>
        <p className="text-indigo-200 text-sm">
          Manage operator accounts, workstation access levels, and audit trail credentials for lab safety standard protocols.
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamMembers.map((member, idx) => (
          <div key={idx} className="glass-panel p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-5xl text-indigo-300 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white text-base leading-snug">{member.name}</h4>
                <p className="text-xs text-cyan-400 font-medium">{member.role}</p>
                <span className="text-[10px] text-indigo-300/60 flex items-center gap-1 mt-1">
                  <FaEnvelope /> {member.email}
                </span>
              </div>
            </div>
            
            <div className="text-right flex flex-col items-end gap-1.5">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                member.status === "Active" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                member.status === "Away" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" :
                "bg-white/5 text-indigo-300 border border-white/10"
              }`}>
                {member.status}
              </span>
              
              <span className="text-[10px] font-mono text-purple-300 flex items-center gap-1">
                <FaShieldAlt /> {member.level}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamScreen;

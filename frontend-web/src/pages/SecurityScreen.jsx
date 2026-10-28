import React from "react";
import { FaLock, FaKey, FaShieldAlt } from "react-icons/fa";

function SecurityScreen() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Overview */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-bold mb-2 text-gradient-cyan-purple">Laboratory Access & Security Settings</h3>
        <p className="text-indigo-200 text-sm">
          Set up security policies, generate developer API tokens, configure multi-factor authentication (2FA), and inspect active workstation sessions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        {/* Authentication Security settings */}
        <div className="glass-panel p-6 space-y-4">
          <h4 className="text-md font-bold text-cyan-400 flex items-center gap-2">
            <FaShieldAlt /> System Policies
          </h4>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <div>
                <p className="font-semibold">Two-Factor Authentication (2FA)</p>
                <span className="text-[10px] text-indigo-300/50">Require mobile passcode validation on login</span>
              </div>
              <input type="checkbox" className="w-4 h-4 accent-cyan-500" />
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <div>
                <p className="font-semibold">Session Auto-Timeout</p>
                <span className="text-[10px] text-indigo-300/50">Auto logout after 30 mins inactivity</span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-cyan-500" />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Enforce ASTM Calibration Rules</p>
                <span className="text-[10px] text-indigo-300/50">Block scan triggers if calibration is expired</span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-cyan-500" />
            </div>
          </div>
        </div>

        {/* Sessions list */}
        <div className="glass-panel p-6 space-y-4">
          <h4 className="text-md font-bold text-purple-400 flex items-center gap-2">
            <FaKey /> Active Hardware Sessions
          </h4>
          
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-white/5 border border-cyan-400/20 rounded-xl space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white font-mono">IP: 192.168.1.146</span>
                <span className="text-[9px] bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded">Active (You)</span>
              </div>
              <p className="text-indigo-300/80">Windows Desktop App • Chrome Browser</p>
            </div>

            <div className="p-3 bg-white/5 border border-white/5 rounded-xl space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white font-mono">IP: 10.0.4.82</span>
                <span className="text-[9px] bg-white/5 text-indigo-300 border border-white/10 px-2 py-0.5 rounded">Idle</span>
              </div>
              <p className="text-indigo-300/80">Potentiostat Integrated Panel OS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecurityScreen;

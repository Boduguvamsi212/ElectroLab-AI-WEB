import React, { useState } from "react";
import { FaCloudUploadAlt, FaHistory, FaCheckCircle, FaSpinner } from "react-icons/fa";

function BackupScreen() {
  const [backingUp, setBackingUp] = useState(false);
  const [success, setSuccess] = useState(false);

  const startBackup = () => {
    setBackingUp(true);
    setTimeout(() => {
      setBackingUp(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Overview */}
      <div className="glass-panel p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-gradient-cyan-purple">Backup & Recovery Center</h3>
          <p className="text-indigo-200 text-sm">
            Configure cloud backups, local offline backup dumps, and restore testing environments from older logs.
          </p>
        </div>
        <button
          onClick={startBackup}
          disabled={backingUp}
          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold text-sm transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-2"
        >
          {backingUp ? <FaSpinner className="animate-spin" /> : <FaCloudUploadAlt />} Start Instant Backup
        </button>
      </div>

      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-sm flex items-center gap-2">
          <FaCheckCircle /> Backup package compiled and uploaded to secure research cloud nodes!
        </div>
      )}

      {/* Scheduler and log */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scheduler config */}
        <div className="glass-panel p-6 space-y-4">
          <h4 className="text-md font-bold text-cyan-400">Automated Backup Settings</h4>
          <div className="space-y-3.5 text-sm">
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Backup Frequency</label>
              <select className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2 text-white">
                <option>Every Day (Midnight)</option>
                <option>Every Week (Sunday)</option>
                <option>After every 10 scan runs</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Cloud Destination</label>
              <select className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2 text-white">
                <option>ElectroLab AWS Cloud S3 Storage</option>
                <option>Local Network Attached Storage (NAS)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Restore Log */}
        <div className="glass-panel p-6 space-y-4">
          <h4 className="text-md font-bold text-purple-400 flex items-center gap-2">
            <FaHistory /> Past Backup Points
          </h4>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center p-2 bg-white/5 rounded border border-white/5">
              <div>
                <p className="font-semibold text-white">Weekly_Backup_2026-07-12.zip</p>
                <span className="text-[9px] text-indigo-300/50">Size: 45.2 MB</span>
              </div>
              <button className="text-cyan-400 hover:underline">Restore</button>
            </div>
            <div className="flex justify-between items-center p-2 bg-white/5 rounded border border-white/5">
              <div>
                <p className="font-semibold text-white">Daily_Backup_2026-07-13.zip</p>
                <span className="text-[9px] text-indigo-300/50">Size: 12.1 MB</span>
              </div>
              <button className="text-cyan-400 hover:underline">Restore</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BackupScreen;

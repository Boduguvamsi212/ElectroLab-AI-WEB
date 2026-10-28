import React from "react";
import { FaCode, FaLink, FaDatabase } from "react-icons/fa";

function ApiIntegrationScreen() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Intro info */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-bold mb-2 text-gradient-cyan-purple">Developer API & Webhooks Integration</h3>
        <p className="text-indigo-200 text-sm">
          Integrate the ElectroLab AI predictions system with custom python data science pipelines, external laboratory LIMS networks, or automation servers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Endpoint Documentation */}
        <div className="glass-panel p-6 space-y-4">
          <h4 className="text-md font-bold text-cyan-400 flex items-center gap-2">
            <FaCode /> API Endpoints Reference
          </h4>
          <div className="space-y-4 text-xs font-mono">
            <div className="p-3 bg-black/20 rounded border border-white/5 space-y-1">
              <span className="text-green-400 font-bold">POST</span>
              <span className="text-white ml-2">/api/v1/predict/tafel</span>
              <p className="text-indigo-300/60 mt-1 font-sans">Pass voltage/current arrays to calculate corrosion rates instantly.</p>
            </div>
            <div className="p-3 bg-black/20 rounded border border-white/5 space-y-1">
              <span className="text-cyan-400 font-bold">GET</span>
              <span className="text-white ml-2">/api/v1/materials/all</span>
              <p className="text-indigo-300/60 mt-1 font-sans">Retrieve alloy characteristics: densities, PREN indexes, etc.</p>
            </div>
          </div>
        </div>

        {/* Webhooks integration */}
        <div className="glass-panel p-6 space-y-4">
          <h4 className="text-md font-bold text-purple-400 flex items-center gap-2">
            <FaLink /> Webhook URL Triggers
          </h4>
          <div className="space-y-3.5 text-sm">
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Payload URL</label>
              <input type="text" defaultValue="https://lims.my-laboratory.org/hooks/corrosion" className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2 text-white font-mono text-xs" />
            </div>
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Trigger Event</label>
              <select className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2 text-white">
                <option>On polarization sweep completion</option>
                <option>On safety threshold override</option>
              </select>
            </div>
          </div>
          <button className="w-full py-2 bg-purple-500/20 border border-purple-500/40 text-purple-300 rounded font-bold text-xs hover:bg-purple-500/30 transition-all">
            Test Payload Ping
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApiIntegrationScreen;

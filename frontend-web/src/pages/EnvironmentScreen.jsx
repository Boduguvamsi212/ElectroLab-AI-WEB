import React from "react";
import { FaWind, FaThermometerHalf, FaTint, FaFlask } from "react-icons/fa";

function EnvironmentScreen() {
  return (
    <div className="space-y-6">
      {/* Parameters Header */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-bold mb-2 text-gradient-cyan-purple">Environmental Conditions Configuration</h3>
        <p className="text-indigo-200 text-sm">
          Define thermodynamic and environmental surroundings of the test cell. These parameters dictate electrochemical kinetics, gaseous diffusion coefficients, and solution resistivity.
        </p>
      </div>

      {/* Inputs grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Solution Properties Card */}
        <div className="glass-panel p-6 space-y-4">
          <h4 className="text-md font-bold text-cyan-400 flex items-center gap-2">
            <FaFlask /> Electrolyte Properties
          </h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Bulk Conductivity (mS/cm)</label>
              <input type="number" defaultValue="48.5" className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white" />
            </div>
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Dissolved Oxygen (ppm)</label>
              <input type="number" defaultValue="6.4" className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white" />
            </div>
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Salinity / Chlorides Conc (g/L)</label>
              <input type="number" defaultValue="35.0" className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white" />
            </div>
          </div>
        </div>

        {/* Ambient Atmosphere Card */}
        <div className="glass-panel p-6 space-y-4">
          <h4 className="text-md font-bold text-purple-400 flex items-center gap-2">
            <FaWind /> Ambient Environment
          </h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Atmospheric Pressure (atm)</label>
              <input type="number" defaultValue="1.0" className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white" />
            </div>
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Relative Humidity (%)</label>
              <input type="number" defaultValue="55" className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white" />
            </div>
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Carbon Dioxide Conc (ppm)</label>
              <input type="number" defaultValue="415" className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Simulation triggers */}
      <div className="glass-panel p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Atmospheric Chamber Sync</h4>
          <p className="text-xs text-indigo-300/60">Synchronize settings with the temperature-controlled autoclave cabinet.</p>
        </div>
        <button className="px-5 py-2.5 rounded-lg btn-glass-cyan text-sm font-bold">
          Connect External Chamber
        </button>
      </div>
    </div>
  );
}

export default EnvironmentScreen;

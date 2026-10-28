import React, { useState, useEffect } from "react";
import { FaGlobe, FaDatabase, FaEye, FaCheckCircle } from "react-icons/fa";
import apiService from "../api/apiService";

function SettingsScreen() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  const [rateUnit, setRateUnit] = useState("mpy (Mils per Year)");
  const [language, setLanguage] = useState("English (US)");
  const [tempUnit, setTempUnit] = useState("C");
  
  const [cloudSync, setCloudSync] = useState(false);
  const [localCache, setLocalCache] = useState(true);
  const [compressExport, setCompressExport] = useState(false);

  const [gridVisible, setGridVisible] = useState(true);
  const [curveLimit, setCurveLimit] = useState(4);
  const [fittingAlgorithm, setFittingAlgorithm] = useState("Butler-Volmer Fitting");

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await apiService.getSettings();
        setSettings(data);
        setCloudSync(data.cloudSyncEnabled);
        setLocalCache(data.autoBackupEnabled);
      } catch (err) {
        console.error("Failed to load settings", err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSaveSettings = async () => {
    setSaving(true);
    setSuccess("");
    try {
      const updated = await apiService.updateSettings({
        potentiostatIp: settings?.potentiostatIp || "127.0.0.1",
        samplingRateMs: settings?.samplingRateMs || 500,
        safetyCutoffV: settings?.safetyCutoffV || 1.0,
        autoBackupEnabled: localCache,
        cloudSyncEnabled: cloudSync,
        rateUnit,
        language,
        tempUnit,
        compressExport,
        gridVisible,
        curveLimit,
        fittingAlgorithm
      });
      setSettings(updated);
      setSuccess("Workstation configuration saved!");
      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      console.error("Failed to save settings", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-cyan-400">
        <span className="animate-spin text-2xl mr-2">⚛</span> Loading Station Preferences...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-sm flex items-center gap-2">
          <FaCheckCircle /> {success}
        </div>
      )}

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Localization & Units */}
        <div className="glass-panel p-6 space-y-4">
          <h4 className="text-md font-bold text-cyan-400 flex items-center gap-2">
            <FaGlobe /> Units & System Language
          </h4>
          
          <div className="space-y-3 text-sm">
            <div>
              <label className="text-xs text-indigo-300 block mb-1">Standard Corrosion Rate Unit</label>
              <select 
                value={rateUnit}
                onChange={(e) => { setRateUnit(e.target.value); setTimeout(handleSaveSettings, 100); }}
                className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2 text-white focus:outline-none"
              >
                <option value="mpy (Mils per Year)">mpy (Mils per Year)</option>
                <option value="mm/yr (Millimeters per Year)">mm/yr (Millimeters per Year)</option>
                <option value="g/m²/day (Weight Loss Equivalent)">g/m²/day (Weight Loss Equivalent)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-indigo-300 block mb-1">Display Language</label>
              <select 
                value={language}
                onChange={(e) => { setLanguage(e.target.value); setTimeout(handleSaveSettings, 100); }}
                className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2 text-white focus:outline-none"
              >
                <option value="English (US)">English (US)</option>
                <option value="Deutsch">Deutsch</option>
                <option value="Français">Français</option>
                <option value="日本語">日本語</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-indigo-300 block mb-1">Temperature Unit</label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="tempUnit" 
                    checked={tempUnit === "C"} 
                    onChange={() => { setTempUnit("C"); setTimeout(handleSaveSettings, 100); }}
                    className="accent-cyan-500"
                  /> Celsius (°C)
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="tempUnit" 
                    checked={tempUnit === "F"} 
                    onChange={() => { setTempUnit("F"); setTimeout(handleSaveSettings, 100); }}
                    className="accent-cyan-500"
                  /> Fahrenheit (°F)
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Database & Cloud Sync */}
        <div className="glass-panel p-6 space-y-4">
          <h4 className="text-md font-bold text-cyan-400 flex items-center gap-2">
            <FaDatabase /> Local Database & Cloud Sync
          </h4>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-1">
              <div>
                <p className="font-semibold">Auto-Sync to Cloud</p>
                <span className="text-[10px] text-indigo-300/50">Upload runs automatically after Tafel fitting</span>
              </div>
              <input 
                type="checkbox" 
                checked={cloudSync}
                onChange={(e) => { setCloudSync(e.target.checked); setTimeout(handleSaveSettings, 100); }}
                className="w-4 h-4 accent-cyan-500 cursor-pointer" 
              />
            </div>

            <div className="flex justify-between items-center py-1">
              <div>
                <p className="font-semibold">Local Storage Cache</p>
                <span className="text-[10px] text-indigo-300/50">Save raw scan curve data points in browser memory</span>
              </div>
              <input 
                type="checkbox" 
                checked={localCache} 
                onChange={(e) => { setLocalCache(e.target.checked); setTimeout(handleSaveSettings, 100); }}
                className="w-4 h-4 accent-cyan-500 cursor-pointer" 
              />
            </div>

            <div className="flex justify-between items-center py-1">
              <div>
                <p className="font-semibold">Compressed JSON Export</p>
                <span className="text-[10px] text-indigo-300/50">Compress curve points file size</span>
              </div>
              <input 
                type="checkbox" 
                checked={compressExport}
                onChange={(e) => { setCompressExport(e.target.checked); setTimeout(handleSaveSettings, 100); }}
                className="w-4 h-4 accent-cyan-500 cursor-pointer" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Laboratory Display Controls */}
      <div className="glass-panel p-6 space-y-4">
        <h4 className="text-md font-bold text-purple-400 flex items-center gap-2">
          <FaEye /> Visualization Studio Preferences
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="p-3 bg-white/5 rounded-xl space-y-1">
            <p className="font-semibold">Grid lines visibility</p>
            <label className="flex items-center gap-2 mt-1 cursor-pointer">
              <input 
                type="checkbox" 
                checked={gridVisible}
                onChange={(e) => { setGridVisible(e.target.checked); setTimeout(handleSaveSettings, 100); }}
                className="accent-cyan-500" 
              /> Enabled
            </label>
          </div>
          <div className="p-3 bg-white/5 rounded-xl space-y-1">
            <p className="font-semibold">Simultaneous curves limit</p>
            <input 
              type="number" 
              value={curveLimit}
              onChange={(e) => { setCurveLimit(parseInt(e.target.value)); setTimeout(handleSaveSettings, 500); }}
              className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-1 text-white text-xs mt-1 focus:outline-none" 
            />
          </div>
          <div className="p-3 bg-white/5 rounded-xl space-y-1">
            <p className="font-semibold">Default Fitting Algorithm</p>
            <select 
              value={fittingAlgorithm}
              onChange={(e) => { setFittingAlgorithm(e.target.value); setTimeout(handleSaveSettings, 100); }}
              className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-1 text-white text-xs mt-1 focus:outline-none"
            >
              <option value="Butler-Volmer Fitting">Butler-Volmer Fitting</option>
              <option value="Levenberg-Marquardt">Levenberg-Marquardt</option>
              <option value="AI Neural Interpolation">AI Neural Interpolation</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsScreen;


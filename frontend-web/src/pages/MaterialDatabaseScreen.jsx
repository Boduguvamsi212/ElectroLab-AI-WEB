import React, { useState, useEffect } from "react";
import { FaSearch, FaDatabase, FaPlus, FaFilter } from "react-icons/fa";
import apiService from "../api/apiService";

function MaterialDatabaseScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await apiService.getMaterials();
        setMaterials(data);
      } catch (err) {
        console.error("Failed to load materials library", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filtered = materials.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.class || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-cyan-400">
        <span className="animate-spin text-2xl mr-2">⚛</span> Loading Material Database...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#0d1c4c] border border-cyan-400/20 p-4 rounded-xl">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search alloy name or grade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/35 border border-cyan-400/20 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
          />
          <FaSearch className="absolute left-3.5 top-3 text-indigo-300/60 text-sm" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <button className="px-3.5 py-2 btn-glass-cyan text-xs font-bold rounded flex items-center gap-1.5">
            <FaFilter /> Filters
          </button>
        </div>
      </div>

      {/* Main Database Table */}
      <div className="glass-panel p-6 overflow-x-auto">
        <h3 className="text-md font-bold mb-4 text-cyan-400 flex items-center gap-2">
          <FaDatabase /> Alloy Material Standards Library
        </h3>
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-cyan-400/20 text-indigo-300">
              <th className="py-2">Material / Grade</th>
              <th className="py-2">Category</th>
              <th className="py-2">Density</th>
              <th className="py-2">Equivalent Weight</th>
              <th className="py-2">Pitting Resistance</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((mat, idx) => (
              <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-3 font-semibold text-white">
                  <div>{mat.name}</div>
                  <div className="text-[10px] text-indigo-300/60 font-normal mt-0.5">{mat.description}</div>
                </td>
                <td className="py-3 text-indigo-200">{mat.class || mat.category}</td>
                <td className="py-3 text-cyan-300 font-mono font-bold">{mat.density}</td>
                <td className="py-3 text-indigo-200 font-mono">{mat.eqWeight}</td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    {mat.pittingResistance}
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

export default MaterialDatabaseScreen;


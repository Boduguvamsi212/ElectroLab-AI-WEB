import React, { useState } from "react";
import { FaBook, FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";

const documentation = [
  {
    title: "Tafel Extrapolation Principles",
    content: "Tafel extrapolation involves fitting a straight line to the linear regions of the anodic and cathodic polarization curves. It allows calculations of Ecorr and Icorr directly, assuming charge transfer dominates the reaction kinetics."
  },
  {
    title: "Stern-Geary Equation",
    content: "The Stern-Geary equation calculates polarization resistance (Rp) according to the formula: Rp = (βa * βc) / (2.303 * Icorr * (βa + βc)). It forms the mathematical foundation of modern electrochemical corrosion monitoring."
  },
  {
    title: "Electrochemical Impedance Spectroscopy (EIS)",
    content: "EIS sweeps small AC potential amplitudes across frequencies from 100 kHz down to 10 mHz. By modeling equivalent electrical circuits (Randles cells), we decouple solution resistance (Rs) from charge-transfer resistance (Rct)."
  }
];

function KnowledgeBaseScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIdx, setOpenIdx] = useState(0);

  const filtered = documentation.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#0d1c4c] border border-cyan-400/20 p-4 rounded-xl">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search corrosion science logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/35 border border-cyan-400/20 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
          />
          <FaSearch className="absolute left-3.5 top-3 text-indigo-300/60 text-sm" />
        </div>
      </div>

      {/* Accordions */}
      <div className="glass-panel p-6 space-y-4">
        <h3 className="text-md font-bold mb-4 text-cyan-400 flex items-center gap-2">
          <FaBook /> Corrosion Science Documentation Library
        </h3>
        
        <div className="space-y-3">
          {filtered.map((doc, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="border border-cyan-400/10 rounded-xl overflow-hidden transition-all bg-white/5">
                <div
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="p-4 flex justify-between items-center cursor-pointer hover:bg-white/5 transition-colors font-semibold text-white text-sm"
                >
                  <span>{doc.title}</span>
                  {isOpen ? <FaChevronUp className="text-cyan-400" /> : <FaChevronDown className="text-indigo-400" />}
                </div>
                {isOpen && (
                  <div className="p-4 border-t border-cyan-400/10 text-xs text-indigo-200 leading-relaxed bg-[#060c24]/40">
                    {doc.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default KnowledgeBaseScreen;

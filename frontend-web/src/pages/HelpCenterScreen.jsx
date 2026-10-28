import React, { useState } from "react";
import { FaLifeRing, FaPaperPlane, FaQuestionCircle } from "react-icons/fa";

function HelpCenterScreen() {
  const [subject, setSubject] = useState("");
  const [desc, setDesc] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject || !desc) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setSubject("");
      setDesc("");
      alert("Support request ticket created successfully!");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* FAQ items */}
      <div className="glass-panel p-6 space-y-4">
        <h3 className="text-md font-bold text-cyan-400 flex items-center gap-2">
          <FaQuestionCircle /> Frequently Asked Questions
        </h3>
        
        <div className="space-y-3.5 text-sm">
          <div className="border-b border-white/5 pb-3">
            <p className="font-semibold text-white">Why does the potentiostat report a 'Reference overload' warning?</p>
            <span className="text-xs text-indigo-300 block mt-1">
              Typically caused by high solution resistance or bubbles isolating the reference electrode capillary tip. Clean the salt bridge.
            </span>
          </div>
          
          <div className="border-b border-white/5 pb-3">
            <p className="font-semibold text-white">How accurate is the AI corrosion rate prediction algorithm?</p>
            <span className="text-xs text-indigo-300 block mt-1">
              Model accuracy is typically within 3.5% deviation compared to 720-hour weight loss tests on steel alloys.
            </span>
          </div>
        </div>
      </div>

      {/* Ticket form */}
      <div className="glass-panel p-6 space-y-4">
        <h3 className="text-md font-bold text-purple-400 flex items-center gap-2">
          <FaLifeRing /> Open Technical Support Ticket
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="text-xs text-indigo-300 block mb-1">Issue Subject</label>
            <input
              type="text"
              placeholder="e.g. Channel B calibration error"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white"
            />
          </div>

          <div>
            <label className="text-xs text-indigo-300 block mb-1">Detailed Description</label>
            <textarea
              placeholder="Provide potentiostat error logs or curve parameters details..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows="4"
              className="w-full bg-[#1b2b62] border border-cyan-400/20 rounded p-2.5 text-white resize-none"
            />
          </div>

          <button type="submit" className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded font-bold text-sm hover:opacity-95 transition-opacity flex items-center gap-2">
            <FaPaperPlane /> Submit Ticket
          </button>
        </form>
      </div>
    </div>
  );
}

export default HelpCenterScreen;

import React from "react";
import { FaYoutube, FaPlayCircle, FaChevronRight } from "react-icons/fa";

const tutorials = [
  { title: "Physical Cell Assembly 101", duration: "12:14 mins", author: "Dr. Alex Carter", desc: "Setting up working, counter, and reference electrodes without reference loop leaks." },
  { title: "AI Noise Filters Setup", duration: "8:42 mins", author: "Sarah Jenkins", desc: "How to toggle Savitzky-Golay parameters and tune prediction sensitivity thresholds." },
  { title: "Exporting to MATLAB & JSON", duration: "5:15 mins", author: "Dr. Alex Carter", desc: "Automate raw potential scan values parsing to external python/matlab scripts." }
];

function TutorialsScreen() {
  return (
    <div className="space-y-6">
      {/* Intro info */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-bold mb-2 text-gradient-cyan-purple">Video Guides & Tutorial walkthroughs</h3>
        <p className="text-indigo-200 text-sm">
          Watch comprehensive training instructions compiled by expert metallurgists for laboratory automation.
        </p>
      </div>

      {/* Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tutorials.map((tut, idx) => (
          <div key={idx} className="glass-panel p-5 space-y-3 flex flex-col justify-between hover:scale-[1.02] transition-transform">
            <div className="space-y-2">
              {/* Mock Video Thumbnail preview placeholder */}
              <div className="aspect-video bg-[#050c22] border border-cyan-400/10 rounded-lg flex items-center justify-center relative group cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-cyan-950/20 group-hover:bg-cyan-950/45 transition-colors" />
                <FaPlayCircle className="text-4xl text-cyan-400 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all z-10" />
                <span className="absolute bottom-2 right-2 text-[9px] bg-black/75 px-1.5 py-0.5 rounded font-mono text-white">
                  {tut.duration}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm leading-snug">{tut.title}</h4>
                <p className="text-[10px] text-cyan-400 mt-0.5 font-medium">Instructor: {tut.author}</p>
              </div>

              <p className="text-xs text-indigo-300/80 leading-relaxed">{tut.desc}</p>
            </div>
            
            <button className="w-full py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-1 text-indigo-200 hover:text-white">
              Watch Guide <FaChevronRight className="text-[10px]" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TutorialsScreen;

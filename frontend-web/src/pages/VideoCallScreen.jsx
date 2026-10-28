import React, { useState } from "react";
import { FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash, FaPhoneSlash } from "react-icons/fa";

function VideoCallScreen() {
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Mock Video Box */}
      <div className="glass-panel p-6 space-y-4">
        <h3 className="text-lg font-bold text-gradient-cyan-purple">Remote Research Videoconference</h3>
        
        <div className="relative aspect-video bg-[#050b20] rounded-2xl border border-cyan-400/20 flex items-center justify-center overflow-hidden">
          {videoOn ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[#07133c]/60">
              <span className="text-xl font-mono text-cyan-300 animate-glow">🔬 LIVE CAMERA STREAM: LAB CELL 4B</span>
            </div>
          ) : (
            <div className="text-indigo-300 text-sm">Webcam feed disabled</div>
          )}

          {/* User mini view */}
          <div className="absolute bottom-4 right-4 w-40 aspect-video bg-[#132357] border border-cyan-400/30 rounded-lg flex items-center justify-center text-[10px] text-white">
            Dr. Alex Carter (You)
          </div>
        </div>

        {/* Video Call Controls */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setVideoOn(!videoOn)}
            className={`p-3 rounded-full border transition-all ${
              videoOn ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300" : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            {videoOn ? <FaVideo /> : <FaVideoSlash />}
          </button>

          <button
            onClick={() => setAudioOn(!audioOn)}
            className={`p-3 rounded-full border transition-all ${
              audioOn ? "bg-purple-500/10 border-purple-500/30 text-purple-300" : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            {audioOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
          </button>

          <button className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors">
            <FaPhoneSlash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoCallScreen;

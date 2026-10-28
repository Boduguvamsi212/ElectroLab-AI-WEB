import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/welcome");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-[#091336] via-[#0e1e5b] to-[#1e1145] flex flex-col justify-center items-center text-white relative overflow-hidden select-none">
      {/* Background radial glow */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl -z-10 animate-glow" />

      {/* Orbiting Logo */}
      <div className="text-center space-y-4">
        <h1 className="text-7xl mb-2 animate-float">⚛</h1>
        <h1 className="text-2xl lg:text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          ELECTROLAB AI
        </h1>
        <p className="text-sm text-cyan-300 font-mono tracking-widest animate-pulse">
          LAUNCHING CORROSION MONITOR...
        </p>
      </div>

      {/* Footer copyright */}
      <div className="absolute bottom-6 text-[10px] text-indigo-300/30 font-mono">
        © 2026 ELECTROLAB RESEARCH GROUP. ALL RIGHTS RESERVED.
      </div>
    </div>
  );
}

export default SplashScreen;
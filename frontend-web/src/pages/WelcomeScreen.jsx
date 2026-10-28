import React from "react";
import { useNavigate } from "react-router-dom";

function WelcomeScreen() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-[#091336] via-[#0e1e5b] to-[#1e1145] flex justify-center items-center p-6">
      <div className="w-full max-w-[400px] flex flex-col items-center gap-6">
        {/* Logo */}
        <span className="text-7xl animate-float mt-6">⚛</span>
        <h1 className="text-3xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-center">
          ElectroLab AI
        </h1>
        <p className="text-sm text-indigo-300 text-center leading-relaxed">
          Next-generation electrochemical corrosion rate prediction platform powered by neural networks and Butler-Volmer kinetics modelling.
        </p>

        {/* Features card */}
        <div className="glass-panel w-full p-5 space-y-3">
          {[
            "✦  Tafel Polarization Curve Analysis",
            "✦  Butler-Volmer Neural Network Models",
            "✦  Real-time Potentiostat Hardware Control",
            "✦  ASTM-G5 Corrosion Rate Standards",
          ].map((f, i) => (
            <p key={i} className="text-sm text-indigo-300">{f}</p>
          ))}
        </div>

        {/* Buttons */}
        <button
          onClick={() => navigate("/signup")}
          className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-bold text-[15px] hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(6,182,212,0.25)]"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate("/login")}
          className="w-full py-3 text-cyan-400 text-sm font-semibold hover:text-white transition-colors"
        >
          I have an account
        </button>
      </div>
    </div>
  );
}

export default WelcomeScreen;

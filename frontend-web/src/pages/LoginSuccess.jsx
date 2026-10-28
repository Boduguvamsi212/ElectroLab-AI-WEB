import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function LoginSuccess() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-[#091336] via-[#0e1e5b] to-[#1e1145] flex justify-center items-center p-4">
      <div className="w-full max-w-[400px] glass-panel p-8 text-center space-y-6">
        <div className="space-y-2">
          <FaCheckCircle className="text-6xl text-green-400 mx-auto animate-float" />
          <h2 className="text-2xl font-black tracking-wide text-gradient-cyan-purple">Login Successful</h2>
          <p className="text-sm text-indigo-300">Authorized workstation link established.</p>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-bold text-sm hover:opacity-95 transition-opacity shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        >
          Open Workstation Dashboard
        </button>
      </div>
    </div>
  );
}

export default LoginSuccess;
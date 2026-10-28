import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBolt, FaFilePdf, FaBrain, FaChartLine } from "react-icons/fa";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "New Polarization",
      icon: <FaBolt />,
      path: "/measurement",
      color: "hover:border-cyan-400 hover:text-cyan-300"
    },
    {
      title: "Export Report",
      icon: <FaFilePdf />,
      path: "/reports",
      color: "hover:border-green-500 hover:text-green-300"
    },
    {
      title: "AI Inference Run",
      icon: <FaBrain />,
      path: "/prediction",
      color: "hover:border-purple-500 hover:text-purple-300"
    },
    {
      title: "Analyze Curves",
      icon: <FaChartLine />,
      path: "/graph",
      color: "hover:border-indigo-500 hover:text-indigo-300"
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white">Laboratory Quick Access</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              if (item.path) {
                navigate(item.path);
              }
            }}
            className={`glass-panel p-5 text-center flex flex-col items-center gap-2 cursor-pointer transition-all border border-white/5 ${item.color}`}
          >
            <span className="text-xl">{item.icon}</span>
            <h4 className="font-bold text-sm text-white">{item.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;
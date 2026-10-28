import React from "react";
import { FaBolt, FaBrain, FaWifi, FaBell } from "react-icons/fa";

function StatsCards() {
  const stats = [
    {
      icon: <FaBolt />,
      value: "12",
      title: "Completed Scans",
      color: "text-cyan-400 border-cyan-400/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
    },
    {
      icon: <FaBrain />,
      value: "98.4%",
      title: "Prediction Accuracy",
      color: "text-purple-400 border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
    },
    {
      icon: <FaWifi />,
      value: "Linked",
      title: "Autoclave Chamber",
      color: "text-green-400 border-green-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
    },
    {
      icon: <FaBell />,
      value: "1 Active",
      title: "Safety Alerts Log",
      color: "text-orange-400 border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className={`glass-panel p-6 border flex flex-col justify-between h-[130px] ${item.color}`}
        >
          <div className="text-2xl">{item.icon}</div>
          <div>
            <h2 className="text-2xl font-black text-white">{item.value}</h2>
            <p className="text-xs text-indigo-300/80 mt-0.5">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
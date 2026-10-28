import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { FaBrain, FaWrench } from "react-icons/fa";

const modelsData = [
  { name: "Random Forest Regressor", accuracy: 94.2, trainingTime: "12s", size: "4.2 MB" },
  { name: "XGBoost Classifier", accuracy: 96.8, trainingTime: "24s", size: "8.5 MB" },
  { name: "Convolutional Net (CNN)", accuracy: 98.4, trainingTime: "140s", size: "42.0 MB" },
  { name: "Linear Tafel Approximation", accuracy: 88.0, trainingTime: "N/A", size: "N/A" }
];

const accuracyChart = [
  { name: "Tafel Fitting", accuracy: 88.0 },
  { name: "Random Forest", accuracy: 94.2 },
  { name: "XGBoost Model", accuracy: 96.8 },
  { name: "ResNet CNN", accuracy: 98.4 }
];

function ModelComparisonScreen() {
  return (
    <div className="space-y-6">
      {/* Intro info */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-bold mb-2 text-gradient-cyan-purple">Machine Learning Model Comparison</h3>
        <p className="text-indigo-200 text-sm">
          Compare predictions accuracy, inference speed, model parameters weight file sizes, and fitting variances of different ML backends on the active dataset.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Accuracy chart */}
        <div className="glass-panel p-6">
          <h3 className="text-md font-bold mb-4 text-cyan-400">Prediction Accuracy Benchmark (%)</h3>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={accuracyChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[80, 100]} />
                <Tooltip contentStyle={{ background: "#0c1840", borderColor: "#06b6d4" }} />
                <Bar dataKey="accuracy" fill="#06b6d4" name="Accuracy (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed specs */}
        <div className="glass-panel p-6 overflow-x-auto">
          <h3 className="text-md font-bold mb-4 text-purple-400 flex items-center gap-2">
            <FaBrain /> AI Model Registry Stats
          </h3>
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-cyan-400/20 text-indigo-300">
                <th className="py-2">Model Version</th>
                <th className="py-2">Prediction Accuracy</th>
                <th className="py-2">Train Speed</th>
                <th className="py-2">Weight File Size</th>
              </tr>
            </thead>
            <tbody>
              {modelsData.map((row, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 font-semibold text-white">{row.name}</td>
                  <td className="py-3 text-cyan-300 font-mono font-bold">{row.accuracy}%</td>
                  <td className="py-3 text-indigo-200 font-mono">{row.trainingTime}</td>
                  <td className="py-3 text-indigo-200 font-mono">{row.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ModelComparisonScreen;

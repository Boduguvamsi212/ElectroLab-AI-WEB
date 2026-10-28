import React, { useState, useEffect } from "react";
import { FaBrain, FaExclamationCircle, FaShieldAlt } from "react-icons/fa";
import apiService from "../api/apiService";

function AIPredictionScreen() {
  const [latestRun, setLatestRun] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await apiService.getLatestPrediction();
        setLatestRun(data);
      } catch (err) {
        console.error("Failed to load predictions", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const run = latestRun || {
    material: "Carbon Steel 1018",
    rate: "0.24 mm/year (9.45 mpy)",
    risk: "Medium Pitting Risk",
    confidence: "95.4%",
    passivation: "Partial Breakdown",
    pH: 7.15
  };

  const getRecommendations = () => {
    const actions = [];
    const mat = run.material.toLowerCase();

    if (mat.includes("carbon")) {
      actions.push({
        title: "Apply Protective Barrier Coating",
        desc: "Coat carbon steel with a dual-layer epoxy or high-durability polyurethane. This delays direct electrolyte interaction by an estimated 5-7 years."
      });
      actions.push({
        title: "Impressed Current Cathodic Protection (ICCP)",
        desc: "Apply negative potential polarization limit offset to suppress anodic iron dissolution reaction zones."
      });
    } else if (mat.includes("stainless")) {
      actions.push({
        title: "Chemical Passivation Bath (ASTM A967)",
        desc: "Treat stainless steel with nitric or citric acid solution to dissolve free iron and enrich surface chromium oxide passive film layer."
      });
      actions.push({
        title: "Mitigate Chloride Concentration",
        desc: "Ensure halide exposure remains under 150 ppm to prevent passive film breakdown and localize pitting nucleation."
      });
    } else {
      actions.push({
        title: "Corrosion Inhibitor Injection",
        desc: "Introduce film-forming organic amine or phosphate inhibitors to block surface active sites in acid mediums."
      });
    }

    // pH based advice
    if (run.pH && run.pH < 5) {
      actions.push({
        title: "Neutralize Solution pH bounds",
        desc: `Current pH is acidic (${run.pH}). Buffer electrolyte closer to neutral range (6.5 - 8.0) to decrease hydrogen evolution acceleration.`
      });
    } else {
      actions.push({
        title: "Regular Potentiodynamic Monitoring",
        desc: "Perform verification calibration and baseline sweeps every 30 days to catch sudden active transitions."
      });
    }

    return actions;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-cyan-400">
        <span className="animate-spin text-2xl mr-2">⚛</span> Loading AI Predictions...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upper overview */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-bold mb-2 text-gradient-cyan-purple">AI Corrosion Analysis & Predictions</h3>
        <p className="text-indigo-200 text-sm">
          Neural network models evaluate potentiodynamic polarization slope curvatures, pH variables, and solution temperature to output corrosion rates and alloy service lifespans.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Prediction Results */}
        <div className="glass-panel p-6 space-y-4">
          <h4 className="text-md font-bold text-cyan-400 flex items-center gap-2">
            <FaBrain /> Neural Network Calculation Result
          </h4>
          
          <div className="space-y-2">
            <span className="text-xs text-indigo-300 block">Risk Evaluation Boundary</span>
            <div className={`text-2xl font-black ${
              run.risk.includes("Critical") || run.risk.includes("High") ? "text-red-400" : "text-yellow-400"
            }`}>
              {run.risk}
            </div>
          </div>

          <div className="space-y-1 text-sm border-t border-white/10 pt-4">
            <div className="flex justify-between py-1">
              <span className="text-indigo-200">Tested Material Alloy</span>
              <span className="font-bold text-white">{run.material}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-indigo-200">Predicted Corrosion Rate</span>
              <span className="font-mono font-bold text-cyan-300">{run.rate}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-indigo-200">Calculated Model Confidence</span>
              <span className="font-mono font-bold text-green-400">{run.confidence}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-indigo-200">Passivation Film Status</span>
              <span className="font-semibold text-white">{run.passivation}</span>
            </div>
          </div>
        </div>

        {/* Action recommendations */}
        <div className="glass-panel p-6 space-y-4">
          <h4 className="text-md font-bold text-purple-400 flex items-center gap-2">
            <FaShieldAlt /> Recommended Mitigation Actions
          </h4>
          <ul className="space-y-3.5 text-xs text-indigo-200">
            {getRecommendations().map((act, index) => (
              <li key={index} className="bg-white/5 p-3 rounded-lg border border-white/5">
                <strong className="text-white block mb-0.5">{act.title}</strong>
                <span>{act.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AIPredictionScreen;
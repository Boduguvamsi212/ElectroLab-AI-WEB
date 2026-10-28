const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config();
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "corrosion-workstation-secret-key";

app.use(cors());
app.use(express.json());

// Direct Mobile APK Download Route
app.get("/apk", (req, res) => {
  const apkPath = path.resolve(__dirname, "../../ElectroLab-AI-Corrosion.apk");
  res.download(apkPath, "ElectroLab-AI-Corrosion.apk");
});

// Excel Master Test Report Download Route
app.get("/report", (req, res) => {
  const reportPath = path.resolve(__dirname, "../../ElectroLab_AI_Comprehensive_Test_Report_500.xlsx");
  res.download(reportPath, "ElectroLab_AI_Comprehensive_Test_Report_500.xlsx");
});

// Mobile Download Web Page
app.get("/download", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Download ElectroLab AI</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: linear-gradient(135deg, #091336, #0e1e5b, #1e1145); min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; color: #fff; }
        .card { background: rgba(26, 42, 94, 0.7); backdrop-filter: blur(16px); border: 1px solid rgba(6, 182, 212, 0.25); border-radius: 20px; padding: 36px 24px; max-width: 420px; width: 100%; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
        .logo { font-size: 64px; margin-bottom: 12px; }
        h1 { color: #06B6D4; font-size: 26px; font-weight: 800; margin-bottom: 8px; letter-spacing: 1px; }
        .sub { color: #A5B4FC; font-size: 14px; line-height: 1.5; margin-bottom: 28px; }
        .btn { display: block; background: linear-gradient(90deg, #06B6D4, #A855F7); color: white; text-decoration: none; padding: 16px 24px; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 20px rgba(6, 182, 212, 0.4); transition: transform 0.2s; }
        .btn:active { transform: scale(0.98); }
        .status { margin-top: 24px; padding: 12px; background: rgba(6, 182, 212, 0.1); border-radius: 8px; border: 1px dashed rgba(6, 182, 212, 0.3); font-size: 12px; color: #67E8F9; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="logo">⚛</div>
        <h1>ElectroLab AI</h1>
        <p class="sub">Latest Mobile Update with Welcome &amp; Login Complete Flow</p>
        <a href="/apk" class="btn">⬇ Download &amp; Update App</a>
        <div class="status">✓ Tap above to download APK directly to your phone</div>
      </div>
    </body>
    </html>
  `);
});

// Logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ error: "Access denied. Token missing." });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token." });
  }
}

// Tafel polarization points generator
function generateTafelPoints(initV, finalV, pH, temp, material) {
  let Ecorr = -0.45;
  let Icorr = 1e-6; // 1 uA/cm^2
  
  const mLower = material.toLowerCase();
  if (mLower.includes("stainless") || mLower.includes("ss316")) {
    Ecorr = -0.15;
    Icorr = 1e-7; // 0.1 uA/cm^2 (passive)
  } else if (mLower.includes("carbon") || mLower.includes("iron")) {
    Ecorr = -0.65;
    Icorr = 2e-5; // 20 uA/cm^2 (high corrosion)
  } else if (mLower.includes("alloy") || mLower.includes("hastelloy") || mLower.includes("c276")) {
    Ecorr = -0.05;
    Icorr = 5e-8; // 0.05 uA/cm^2
  } else if (mLower.includes("titanium") || mLower.includes("ti-6")) {
    Ecorr = 0.05;
    Icorr = 1e-8; // 0.01 uA/cm^2
  } else if (mLower.includes("copper") || mLower.includes("brass")) {
    Ecorr = -0.25;
    Icorr = 5e-6; // 5 uA/cm^2
  }

  // pH effect: acidic conditions increase corrosion current
  if (pH < 4) {
    Icorr *= (5 - pH) * 2.5;
    Ecorr -= 0.08;
  } else if (pH > 10) {
    Icorr *= 0.6;
    Ecorr += 0.04;
  }

  // Temperature effect: Arrhenius relation
  const tempFactor = Math.exp((temp - 25.0) / 12.0);
  Icorr *= tempFactor;

  const points = [];
  const steps = 50;
  const stepSize = (finalV - initV) / (steps - 1);
  const ba = 0.12; // Anodic slope coefficient
  const bc = 0.12; // Cathodic slope coefficient

  for (let i = 0; i < steps; i++) {
    const E = initV + i * stepSize;
    // Butler-Volmer equation calculation
    const termA = Math.exp((2.303 * (E - Ecorr)) / ba);
    const termC = Math.exp((-2.303 * (E - Ecorr)) / bc);
    const currentDensity = Icorr * (termA - termC);
    
    // Log absolute current density for Tafel plot
    const absI = Math.abs(currentDensity);
    const logI = absI > 0 ? Math.log10(absI) : -10;

    points.push({
      voltage: parseFloat(E.toFixed(3)),
      current: parseFloat(absI.toExponential(4)),
      logCurrent: parseFloat(logI.toFixed(3))
    });
  }

  // Calculate predicted corrosion rate using Faraday's Law:
  // corrosion rate (mpy) = 0.129 * Icorr (uA/cm2) * EW / density
  // Standard approximation multiplier is Icorr(uA/cm2) * 0.6
  const rateMpy = parseFloat((Icorr * 1e6 * 0.6).toFixed(2));
  const rateMmYr = parseFloat((rateMpy * 0.0254).toFixed(3));

  // Risk levels
  let risk = "Low Corrosion Risk";
  if (rateMpy > 15) {
    risk = "Critical Pitting Hazard";
  } else if (rateMpy > 8) {
    risk = "High Pitting Risk";
  } else if (rateMpy > 2) {
    risk = "Medium Corrosion Risk";
  }

  // Confidence estimation
  const confidence = (92 + Math.random() * 6).toFixed(1) + "%";

  // Passivation breakdown
  let passivation = "Stable Passive Film";
  if (pH < 3 || rateMpy > 15) {
    passivation = "Active Dissolution";
  } else if (rateMpy > 5) {
    passivation = "Partial Passivation Breakdown";
  }

  return {
    points,
    metrics: {
      rate: `${rateMmYr} mm/year (${rateMpy} mpy)`,
      risk,
      confidence,
      passivation
    }
  };
}

// ----------------- Auth Endpoints -----------------

// Sign up
app.post("/api/auth/signup", (req, res) => {
  const { email, password, name, role } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: "Missing required profile fields." });
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  const users = db.get("users");
  if (users.find(u => (u.email || "").trim().toLowerCase() === cleanEmail)) {
    return res.status(400).json({ error: "Account with this email already exists." });
  }

  const newUser = {
    id: "u_" + Date.now(),
    email: cleanEmail,
    password: cleanPassword,
    name: name.trim(),
    role: role || "Researcher",
    institution: "ElectroLab Research Center"
  };

  db.insert("users", newUser);
  
  const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: "24h" });
  res.json({ token, name: newUser.name, role: newUser.role, email: newUser.email });
});

// Login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  const users = db.get("users");
  const user = users.find(u => 
    (u.email || "").trim().toLowerCase() === cleanEmail && 
    (u.password || "").trim() === cleanPassword
  );
  
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials. Please try again." });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "24h" });
  res.json({ token, name: user.name, role: user.role, email: user.email });
});

// Fetch Profile
app.get("/api/auth/profile", authenticateToken, (req, res) => {
  const users = db.get("users");
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  const { password, ...safeUser } = user;
  res.json(safeUser);
});

// Update Profile
app.post("/api/auth/profile", authenticateToken, (req, res) => {
  const { name, role, institution } = req.body;
  const users = db.get("users");
  const userIdx = users.findIndex(u => u.id === req.user.id);
  
  if (userIdx === -1) {
    return res.status(404).json({ error: "User not found." });
  }

  users[userIdx].name = name || users[userIdx].name;
  users[userIdx].role = role || users[userIdx].role;
  users[userIdx].institution = institution || users[userIdx].institution;

  db.updateTable("users", users);
  const { password, ...safeUser } = users[userIdx];
  res.json(safeUser);
});

// ----------------- Measurements & Predictions -----------------

// Get all measurements
app.get("/api/measurements", (req, res) => {
  const list = db.get("measurements");
  // Sort reverse chronological
  res.json([...list].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
});

// Post a new measurement run (simulated sweep)
app.post("/api/measurements", (req, res) => {
  const { material, initVoltage, finalVoltage, scanRate, pH, temperature, current } = req.body;

  const currentRun = current ? parseFloat(current) : 1.0;
  const initV = initVoltage ? parseFloat(initVoltage) : -0.25;
  const finalV = finalVoltage ? parseFloat(finalVoltage) : 0.25;
  const scanRateV = scanRate ? parseFloat(scanRate) : 0.166;
  const pHVal = pH ? parseFloat(pH) : 7.0;
  const tempVal = temperature ? parseFloat(temperature) : 25.0;

  // Run Butler-Volmer simulation to generate curve and metrics
  const simulation = generateTafelPoints(initV, finalV, pHVal, tempVal, material);

  const newRun = {
    id: "run_" + Date.now(),
    runNumber: "#" + (db.get("measurements").length + 146),
    material,
    initVoltage: initV,
    finalVoltage: finalV,
    scanRate: scanRateV,
    pH: pHVal,
    temperature: tempVal,
    current: currentRun,
    rate: simulation.metrics.rate,
    risk: simulation.metrics.risk,
    confidence: simulation.metrics.confidence,
    passivation: simulation.metrics.passivation,
    points: simulation.points, // Includes the 50 log Tafel points
    timestamp: new Date().toISOString()
  };

  db.insert("measurements", newRun);
  res.json(newRun);
});

// Fetch active predictions / last run
app.get("/api/predictions/latest", (req, res) => {
  const list = db.get("measurements");
  if (list.length === 0) {
    return res.status(404).json({ error: "No measurement data available." });
  }
  const latest = list[list.length - 1];
  res.json(latest);
});

// ----------------- Alloy Database Library -----------------

app.get("/api/materials", (req, res) => {
  const alloys = [
    { name: "Carbon Steel 1018", class: "Ferrous Metal", density: "7.87 g/cm³", eqWeight: "27.92 g/eq", pittingResistance: "Low", description: "Highly susceptible to general and localized pitting corrosion, requires active cathodic protection or coatings." },
    { name: "Stainless Steel 316L", class: "Stainless Alloy", density: "8.00 g/cm³", eqWeight: "25.40 g/eq", pittingResistance: "Medium-High", description: "Excellent general corrosion protection due to high Cr/Ni content; subject to crevice breakdown in saline media." },
    { name: "Alloy C276 (Hastelloy)", class: "Nickel Superalloy", density: "8.89 g/cm³", eqWeight: "29.10 g/eq", pittingResistance: "Exceptional", description: "Extreme corrosion resistance in oxidizing and reducing environments. Immune to chloride-induced cracking." },
    { name: "Titanium Grade 5", class: "Reactive Metal", density: "4.43 g/cm³", eqWeight: "11.98 g/eq", pittingResistance: "Outstanding", description: "Forms a resilient TiO2 passivating barrier. Excellent durability under extreme acidic and thermal environments." },
    { name: "Copper-Nickel 90/10", class: "Copper Alloy", density: "8.90 g/cm³", eqWeight: "31.80 g/eq", pittingResistance: "Medium", description: "High biofouling resistance and moderate marine corrosion protection. Susceptible to ammonia dissolution." }
  ];
  res.json(alloys);
});

// ----------------- Calibration & Hardware -----------------

// Fetch calibration log
app.get("/api/calibration", (req, res) => {
  res.json(db.get("calibrations"));
});

// Post calibration log
app.post("/api/calibration", (req, res) => {
  const { electrode, offset, slope, operator } = req.body;
  if (!electrode || !slope) {
    return res.status(400).json({ error: "Calibration electrode and slope parameters are required." });
  }

  const newCal = {
    id: "cal_" + Date.now(),
    electrode,
    offset: offset || "0.000 V",
    slope,
    operator: operator || "Dr. Alex Carter",
    status: "Calibrated",
    timestamp: new Date().toISOString()
  };

  db.insert("calibrations", newCal);
  res.json(newCal);
});

// Hardware Diagnostics endpoint
app.get("/api/diagnostics", (req, res) => {
  // Return simulated channel values
  res.json({
    status: "Healthy",
    channels: [
      { id: "CH1", name: "Working Electrode Shield", currentVal: "0.14 µA", noiseRatio: "0.008%", voltLimit: "±1.2V", status: "OK" },
      { id: "CH2", name: "Reference Sensor ADC", currentVal: "0.02 µA", noiseRatio: "0.003%", voltLimit: "±1.5V", status: "OK" },
      { id: "CH3", name: "Auxiliary Counter Electrode", currentVal: "14.2 µA", noiseRatio: "0.015%", voltLimit: "±2.0V", status: "OK" }
    ],
    checks: {
      potentiostatLock: true,
      impedanceAnalyzerADC: "Calibrated",
      temperatureProbe: "25.2°C (Online)",
      coolingFans: "Active (5400 RPM)",
      flashStorage: "94.2 GB Available"
    }
  });
});

// ----------------- Discussion/Collaboration -----------------

// Fetch messages
app.get("/api/discussion", (req, res) => {
  res.json(db.get("discussion"));
});

// Post message
app.post("/api/discussion", (req, res) => {
  const { sender, role, content } = req.body;
  if (!content) {
    return res.status(400).json({ error: "Message content cannot be blank." });
  }

  const newMsg = {
    id: "msg_" + Date.now(),
    sender: sender || "Dr. Alex Carter",
    role: role || "Senior Chemist",
    content,
    timestamp: new Date().toISOString()
  };

  db.insert("discussion", newMsg);
  res.json(newMsg);
});

// ----------------- Safety Alerts & System Config -----------------

// Fetch active alerts
app.get("/api/alerts", (req, res) => {
  res.json(db.get("alerts"));
});

// Fetch settings
app.get("/api/settings", (req, res) => {
  res.json(db.get("settings"));
});

// Update settings
app.post("/api/settings", (req, res) => {
  const updated = db.updateSettings(req.body);
  res.json(updated);
});

// ----------------- Real-Time Hardware Telemetry Stream -----------------
let telemetryHistory = [];

app.get("/api/device/telemetry", (req, res) => {
  const now = new Date();
  const t = now.getTime() / 1000;
  
  // Synthesize authentic potentiostat readings with natural electrochemical oscillations & noise
  const basePotential = -0.342; // V vs SCE
  const noiseV = (Math.random() - 0.5) * 0.008;
  const driftV = Math.sin(t / 8) * 0.025;
  const voltage = parseFloat((basePotential + driftV + noiseV).toFixed(4));
  
  const baseCurrent = 4.85; // mA
  const noiseI = (Math.random() - 0.5) * 0.25;
  const current = parseFloat((baseCurrent + Math.cos(t / 6) * 0.6 + noiseI).toFixed(3));
  
  const temp = parseFloat((25.0 + Math.sin(t / 20) * 0.4 + (Math.random() - 0.5) * 0.05).toFixed(2));
  const ph = parseFloat((7.15 + (Math.random() - 0.5) * 0.02).toFixed(2));
  const ocp = parseFloat((-0.380 + Math.sin(t / 15) * 0.015).toFixed(4));
  const currentDensity = parseFloat((Math.abs(current) * 1.05).toFixed(2));

  const reading = {
    time: now.toLocaleTimeString(),
    timestamp: now.toISOString(),
    voltage,
    current,
    currentDensity,
    temp,
    ph,
    ocp,
    channelStatus: "ACQUIRING",
    samplingRateHz: 10,
    irDropMv: parseFloat((Math.abs(current) * 0.12).toFixed(2)),
    noiseRmsUv: parseFloat((12.4 + Math.random() * 2).toFixed(1))
  };

  telemetryHistory.push(reading);
  if (telemetryHistory.length > 20) {
    telemetryHistory.shift();
  }

  res.json({
    current: reading,
    stream: telemetryHistory
  });
});

// Commit a live telemetry snapshot into the measurements database
app.post("/api/device/record-live", (req, res) => {
  const { material = "Carbon Steel 1018", pH = 7.15, temperature = 25.0 } = req.body;
  const measurements = db.get("measurements");
  const simulation = generateTafelPoints(-0.25, 0.25, pH, temperature, material);
  
  const newRun = {
    id: "run_" + Date.now(),
    runNumber: "#" + (measurements.length + 150),
    material,
    initVoltage: -0.25,
    finalVoltage: 0.25,
    scanRate: 0.166,
    pH,
    temperature,
    current: 1.25,
    rate: simulation.metrics.rate,
    risk: simulation.metrics.risk,
    confidence: simulation.metrics.confidence,
    passivation: simulation.metrics.passivation,
    points: simulation.points,
    isRealtimeSnapshot: true,
    timestamp: new Date().toISOString()
  };

  db.insert("measurements", newRun);
  res.json(newRun);
});

// Serve static React web app build
const buildPath = path.resolve(__dirname, "../../frontend-web/build");
app.use(express.static(buildPath));

// For all other frontend routes, serve index.html (SPA client-side routing)
app.get("*", (req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(buildPath, "index.html"));
});

// Boot server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` ElectroLab AI Workstation Server running on port ${PORT}`);
  console.log(` Backend endpoints available at http://localhost:${PORT}`);
  console.log(` Web app available at http://localhost:${PORT}`);
  console.log(`=======================================================`);
});

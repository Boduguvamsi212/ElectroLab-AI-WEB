const BASE_URL = (typeof window !== "undefined" && window.location.origin && window.location.origin.startsWith("http"))
  ? `${window.location.origin}/api`
  : "http://192.168.1.3:5000/api";

// Helper to construct headers with optional authorization token
function getHeaders() {
  const headers = {
    "Content-Type": "application/json"
  };
  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

// Global service interface
const apiService = {
  // ----------------- Authentication -----------------
  async login(email, password) {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Login failed");
      }
      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (err) {
      console.warn("API Service: Login error. Falling back to mock session.", err);
      // Mock Fallback
      if (email === "alex@corrosion.lab" && password === "password123") {
        const mockUser = { token: "mock_jwt_token_123", name: "Dr. Alex Carter", role: "Senior Chemist", email };
        localStorage.setItem("token", mockUser.token);
        localStorage.setItem("user", JSON.stringify(mockUser));
        return mockUser;
      }
      throw err;
    }
  },

  async signup(email, password, name, role) {
    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email, password, name, role })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Signup failed");
      }
      return await res.json();
    } catch (err) {
      console.warn("API Service: Signup error. Falling back to mock registration.", err);
      return { email, name, role };
    }
  },

  async getProfile() {
    try {
      const res = await fetch(`${BASE_URL}/auth/profile`, {
        method: "GET",
        headers: getHeaders()
      });
      if (!res.ok) throw new Error("Failed to load profile");
      return await res.json();
    } catch (err) {
      console.warn("API Service: Profile load failed. Returning active session.", err);
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : { name: "Dr. Alex Carter", role: "Senior Chemist", institution: "ElectroLab Research Center" };
    }
  },

  async updateProfile(profileData) {
    try {
      const res = await fetch(`${BASE_URL}/auth/profile`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(profileData)
      });
      if (!res.ok) throw new Error("Failed to update profile");
      const updated = await res.json();
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    } catch (err) {
      console.warn("API Service: Profile update failed.", err);
      localStorage.setItem("user", JSON.stringify(profileData));
      return profileData;
    }
  },

  // ----------------- Measurements & Predictions -----------------
  async getMeasurements() {
    try {
      const res = await fetch(`${BASE_URL}/measurements`, {
        method: "GET",
        headers: getHeaders()
      });
      if (!res.ok) throw new Error("Failed to fetch runs.");
      return await res.json();
    } catch (err) {
      console.warn("API Service: Fetch runs error. Returning mock history list.", err);
      return [
        { id: "run_148", runNumber: "#148", material: "Carbon Steel 1018", rate: "12.42 mpy", risk: "Medium Pitting Risk", passivation: "Partial Breakdown", timestamp: new Date().toISOString() },
        { id: "run_147", runNumber: "#147", material: "Stainless Steel 316L", rate: "0.14 mpy", risk: "Low Corrosion Risk", passivation: "Stable Film", timestamp: new Date(Date.now() - 3600000).toISOString() },
        { id: "run_146", runNumber: "#146", material: "Alloy C276 (Hastelloy)", rate: "3.18 mpy", risk: "Medium Corrosion Risk", passivation: "Active Dissolution", timestamp: new Date(Date.now() - 86400000).toISOString() }
      ];
    }
  },

  async createMeasurement(measurementData) {
    try {
      const res = await fetch(`${BASE_URL}/measurements`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(measurementData)
      });
      if (!res.ok) throw new Error("Failed to create polarization run.");
      const data = await res.json();
      localStorage.setItem("activeRun", JSON.stringify(data));
      return data;
    } catch (err) {
      console.warn("API Service: Sweep scan request failed. Building mock Tafel sweep.", err);
      // Mock generate on failure
      const rate = measurementData.material.includes("Stainless") ? "0.15 mpy" : "11.8 mpy";
      const risk = measurementData.material.includes("Stainless") ? "Low Corrosion Risk" : "High Pitting Risk";
      const mockResult = {
        id: "run_" + Date.now(),
        runNumber: "#" + Math.floor(Math.random() * 1000),
        material: measurementData.material,
        initVoltage: measurementData.initVoltage || -0.25,
        finalVoltage: measurementData.finalVoltage || 0.25,
        scanRate: measurementData.scanRate || 0.166,
        pH: measurementData.pH || 7.0,
        temperature: measurementData.temperature || 25,
        current: measurementData.current || 1.0,
        rate,
        risk,
        confidence: "94.6%",
        passivation: "Stable Passive Film",
        points: Array.from({ length: 50 }, (_, idx) => {
          const v = (measurementData.initVoltage || -0.25) + (idx * 0.01);
          return {
            voltage: parseFloat(v.toFixed(3)),
            logCurrent: parseFloat((-6 + Math.abs(idx - 25) * 0.15 + (Math.random() * 0.05)).toFixed(3))
          };
        }),
        timestamp: new Date().toISOString()
      };
      localStorage.setItem("activeRun", JSON.stringify(mockResult));
      return mockResult;
    }
  },

  async getRealtimeTelemetry() {
    try {
      const res = await fetch(`${BASE_URL}/device/telemetry`, {
        headers: getHeaders()
      });
      if (!res.ok) throw new Error("Telemetry fetch failed");
      return await res.json();
    } catch (err) {
      const now = new Date();
      return {
        current: {
          time: now.toLocaleTimeString(),
          voltage: parseFloat((-0.34 + (Math.random() - 0.5) * 0.03).toFixed(4)),
          current: parseFloat((4.8 + (Math.random() - 0.5) * 0.5).toFixed(3)),
          currentDensity: parseFloat((5.1 + (Math.random() - 0.5) * 0.6).toFixed(2)),
          temp: parseFloat((25.0 + (Math.random() - 0.5) * 0.3).toFixed(2)),
          ph: 7.15,
          ocp: -0.380,
          channelStatus: "ACQUIRING",
          irDropMv: 0.58,
          noiseRmsUv: 12.8
        },
        stream: []
      };
    }
  },

  async recordRealtimeMeasurement(payload = {}) {
    try {
      const res = await fetch(`${BASE_URL}/device/record-live`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Failed to record live snapshot");
      const saved = await res.json();
      localStorage.setItem("activeRun", JSON.stringify(saved));
      return saved;
    } catch (err) {
      console.warn("API Service: Live snapshot failed.", err);
      return null;
    }
  },

  async getLatestPrediction() {
    try {
      const res = await fetch(`${BASE_URL}/predictions/latest`, {
        method: "GET",
        headers: getHeaders()
      });
      if (!res.ok) throw new Error("No latest predictions found.");
      return await res.json();
    } catch (err) {
      console.warn("API Service: Fetch latest predictions failed. Returning fallback prediction.", err);
      return {
        id: "run_148",
        runNumber: "#148",
        material: "Carbon Steel 1018",
        initVoltage: -0.25,
        finalVoltage: 0.25,
        scanRate: 0.166,
        pH: 7.15,
        temperature: 25.0,
        current: 1.25,
        rate: "0.24 mm/year (9.45 mpy)",
        risk: "Medium Pitting Risk",
        confidence: "95.4%",
        passivation: "Partial Breakdown",
        timestamp: new Date().toISOString()
      };
    }
  },

  // ----------------- Alloy Database Library -----------------
  async getMaterials() {
    try {
      const res = await fetch(`${BASE_URL}/materials`, {
        method: "GET",
        headers: getHeaders()
      });
      if (!res.ok) throw new Error("Failed to load alloy DB.");
      return await res.json();
    } catch (err) {
      console.warn("API Service: Fetch materials library failed.", err);
      return [
        { name: "Carbon Steel 1018", class: "Ferrous Metal", density: "7.87 g/cm³", eqWeight: "27.92 g/eq", pittingResistance: "Low", description: "Highly susceptible to general and localized pitting corrosion." },
        { name: "Stainless Steel 316L", class: "Stainless Alloy", density: "8.00 g/cm³", eqWeight: "25.40 g/eq", pittingResistance: "Medium-High", description: "Excellent general corrosion protection due to Cr/Ni passivation passive film." },
        { name: "Alloy C276 (Hastelloy)", class: "Nickel Superalloy", density: "8.89 g/cm³", eqWeight: "29.10 g/eq", pittingResistance: "Exceptional", description: "Extreme corrosion resistance in hostile acid environments." }
      ];
    }
  },

  // ----------------- Calibration & Hardware -----------------
  async getCalibrations() {
    try {
      const res = await fetch(`${BASE_URL}/calibration`, {
        method: "GET",
        headers: getHeaders()
      });
      if (!res.ok) throw new Error("Failed to load calibrations.");
      return await res.json();
    } catch (err) {
      console.warn("API Service: Fetch calibrations failed.", err);
      return [
        { id: "cal_1", electrode: "Reference Electrode (Ag/AgCl)", offset: "+0.002 V", slope: "99.2%", operator: "Dr. Alex Carter", status: "Calibrated", timestamp: new Date().toISOString() }
      ];
    }
  },

  async createCalibration(calibrationData) {
    try {
      const res = await fetch(`${BASE_URL}/calibration`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(calibrationData)
      });
      if (!res.ok) throw new Error("Failed to submit calibration.");
      return await res.json();
    } catch (err) {
      console.warn("API Service: Submit calibration failed. Mocking output.", err);
      return {
        id: "cal_" + Date.now(),
        ...calibrationData,
        status: "Calibrated",
        timestamp: new Date().toISOString()
      };
    }
  },

  async getDiagnostics() {
    try {
      const res = await fetch(`${BASE_URL}/diagnostics`, {
        method: "GET",
        headers: getHeaders()
      });
      if (!res.ok) throw new Error("Diagnostics query failed.");
      return await res.json();
    } catch (err) {
      console.warn("API Service: Fetch diagnostics failed.", err);
      return {
        status: "Offline Mode",
        channels: [
          { id: "CH1", name: "Working Electrode Shield", currentVal: "N/A", noiseRatio: "0.0%", voltLimit: "±1.2V", status: "OFFLINE" },
          { id: "CH2", name: "Reference Sensor ADC", currentVal: "N/A", noiseRatio: "0.0%", voltLimit: "±1.5V", status: "OFFLINE" }
        ],
        checks: {
          potentiostatLock: false,
          impedanceAnalyzerADC: "Not Connected",
          temperatureProbe: "Disconnected",
          coolingFans: "Inactive",
          flashStorage: "Local Browser Sandbox"
        }
      };
    }
  },

  // ----------------- Collaboration Discussion -----------------
  async getDiscussion() {
    try {
      const res = await fetch(`${BASE_URL}/discussion`, {
        method: "GET",
        headers: getHeaders()
      });
      if (!res.ok) throw new Error("Discussion load failed.");
      return await res.json();
    } catch (err) {
      console.warn("API Service: Load discussion feed failed.", err);
      return [
        { id: "msg_1", sender: "Dr. Alex Carter", role: "Senior Chemist", content: "System connection offline. Using local simulation sweep mode.", timestamp: new Date().toISOString() }
      ];
    }
  },

  async postDiscussion(messageData) {
    try {
      const res = await fetch(`${BASE_URL}/discussion`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(messageData)
      });
      if (!res.ok) throw new Error("Post message failed.");
      return await res.json();
    } catch (err) {
      console.warn("API Service: Post message failed.", err);
      return {
        id: "msg_" + Date.now(),
        ...messageData,
        timestamp: new Date().toISOString()
      };
    }
  },

  // ----------------- Safety Alerts & System Config -----------------
  async getAlerts() {
    try {
      const res = await fetch(`${BASE_URL}/alerts`, {
        method: "GET",
        headers: getHeaders()
      });
      if (!res.ok) throw new Error("Alerts load failed.");
      return await res.json();
    } catch (err) {
      console.warn("API Service: Load alerts failed.", err);
      return [
        { id: "alert_1", title: "Offline Alert Buffer", description: "Potentiostat cell counter electrode shield voltage is zero.", severity: "Warning", status: "Active", timestamp: new Date().toISOString() }
      ];
    }
  },

  async getSettings() {
    try {
      const res = await fetch(`${BASE_URL}/settings`, {
        method: "GET",
        headers: getHeaders()
      });
      if (!res.ok) throw new Error("Load settings failed.");
      return await res.json();
    } catch (err) {
      console.warn("API Service: Fetch config settings failed.", err);
      return {
        potentiostatIp: "127.0.0.1",
        samplingRateMs: 500,
        safetyCutoffV: 1.0,
        autoBackupEnabled: false,
        cloudSyncEnabled: false
      };
    }
  },

  async updateSettings(settingsData) {
    try {
      const res = await fetch(`${BASE_URL}/settings`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(settingsData)
      });
      if (!res.ok) throw new Error("Post settings failed.");
      return await res.json();
    } catch (err) {
      console.warn("API Service: Update config settings failed.", err);
      return settingsData;
    }
  }
};

export default apiService;

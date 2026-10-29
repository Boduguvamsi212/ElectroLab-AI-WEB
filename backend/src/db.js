const fs = require("fs");
const path = require("path");

const DB_DIR = path.join(__dirname, "..", "data");
const DB_PATH = path.join(DB_DIR, "db.json");

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Initial seed data
const initialData = {
  users: [
    {
      id: "u1",
      email: "alex@corrosion.lab",
      password: "password123", // Simple plain text for mock security
      name: "Dr. Alex Carter",
      role: "Senior Chemist",
      institution: "ElectroLab Research Center",
      avatar: ""
    }
  ],
  measurements: [
    {
      id: "run_148",
      runNumber: "#148",
      material: "Carbon Steel 1018",
      initVoltage: -0.25,
      finalVoltage: 0.25,
      scanRate: 0.166,
      pH: 7.15,
      temperature: 25.0,
      current: 1.25,
      rate: "12.42 mpy",
      risk: "Medium Pitting Risk",
      confidence: "95.4%",
      passivation: "Partial Breakdown",
      timestamp: "2026-07-14T12:30:00Z"
    },
    {
      id: "run_147",
      runNumber: "#147",
      material: "Stainless Steel 316L",
      initVoltage: -0.5,
      finalVoltage: 0.5,
      scanRate: 0.166,
      pH: 6.8,
      temperature: 25.0,
      current: 0.05,
      rate: "0.14 mpy",
      risk: "Low Corrosion Risk",
      confidence: "98.1%",
      passivation: "Stable Film",
      timestamp: "2026-07-14T10:15:00Z"
    },
    {
      id: "run_146",
      runNumber: "#146",
      material: "Alloy C276 (Hastelloy)",
      initVoltage: -0.4,
      finalVoltage: 0.6,
      scanRate: 0.2,
      pH: 2.5,
      temperature: 50.0,
      current: 0.85,
      rate: "3.18 mpy",
      risk: "Medium Corrosion Risk",
      confidence: "94.2%",
      passivation: "Active Dissolution",
      timestamp: "2026-07-13T16:45:00Z"
    }
  ],
  calibrations: [
    {
      id: "cal_1",
      electrode: "Reference Electrode (Ag/AgCl)",
      offset: "+0.002 V",
      slope: "99.2%",
      operator: "Dr. Alex Carter",
      status: "Calibrated",
      timestamp: "2026-07-14T09:00:00Z"
    },
    {
      id: "cal_2",
      electrode: "Working Electrode (Platinum)",
      offset: "-0.001 V",
      slope: "98.7%",
      operator: "Dr. Alex Carter",
      status: "Calibrated",
      timestamp: "2026-07-13T08:30:00Z"
    }
  ],
  discussion: [
    {
      id: "msg_1",
      sender: "Dr. Alex Carter",
      role: "Senior Chemist",
      content: "Potentiostat channel 3 calibrated. Baseline drift is under 0.2 mV.",
      timestamp: "2026-07-14T11:00:00Z"
    },
    {
      id: "msg_2",
      sender: "Sarah Jenkins",
      role: "Research Associate",
      content: "Great, I'll run the high-temperature sweep scans on Carbon Steel 1018 next.",
      timestamp: "2026-07-14T11:15:00Z"
    }
  ],
  alerts: [
    {
      id: "alert_1",
      title: "Passivation breakdown detected",
      description: "Channel 2 current densities exceeded 100 µA/cm² on Carbon Steel 1018.",
      severity: "Warning",
      status: "Active",
      timestamp: "2026-07-14T12:32:00Z"
    },
    {
      id: "alert_2",
      title: "Electrolyte temperature drift",
      description: "Temperature sensor on Cell B reads 28.5°C (Target: 25.0°C).",
      severity: "Info",
      status: "Resolved",
      timestamp: "2026-07-14T10:45:00Z"
    }
  ],
  settings: {
    potentiostatIp: "192.168.1.105",
    samplingRateMs: 250,
    safetyCutoffV: 1.5,
    autoBackupEnabled: true,
    cloudSyncEnabled: false
  }
};

// Check and initialize db
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), "utf8");
}

class Database {
  constructor() {
    this.cache = null;
    this.saveTimeout = null;
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DB_PATH)) {
        const raw = fs.readFileSync(DB_PATH, "utf8");
        this.cache = JSON.parse(raw);
      } else {
        this.cache = JSON.parse(JSON.stringify(initialData));
        fs.writeFileSync(DB_PATH, JSON.stringify(this.cache, null, 2), "utf8");
      }
    } catch (e) {
      this.cache = JSON.parse(JSON.stringify(initialData));
    }
  }

  read() {
    if (!this.cache) {
      this.init();
    }
    return this.cache;
  }

  scheduleSave() {
    if (this.saveTimeout) return;
    this.saveTimeout = setTimeout(() => {
      this.saveTimeout = null;
      try {
        if (this.cache) {
          fs.writeFileSync(DB_PATH, JSON.stringify(this.cache, null, 2), "utf8");
        }
      } catch (err) {
        console.error("Error writing database file:", err);
      }
    }, 500);
  }

  write(data) {
    this.cache = data;
    this.scheduleSave();
    return true;
  }

  get(table) {
    const data = this.read();
    return data[table] || [];
  }

  insert(table, record) {
    const data = this.read();
    if (!data[table]) {
      data[table] = [];
    }
    data[table].push(record);
    this.write(data);
    return record;
  }

  updateTable(table, dataToSave) {
    const data = this.read();
    data[table] = dataToSave;
    this.write(data);
    return dataToSave;
  }

  updateSettings(newSettings) {
    const data = this.read();
    data.settings = { ...data.settings, ...newSettings };
    this.write(data);
    return data.settings;
  }
}

module.exports = new Database();

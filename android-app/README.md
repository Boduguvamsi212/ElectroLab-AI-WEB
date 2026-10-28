# ElectroLab AI — Android App

Native Android application mirroring the ElectroLab AI Corrosion Workstation web platform.

**Stack:** Java + XML · Retrofit 2 · MPAndroidChart · Material Components

---

## How to Open in Android Studio

1. Open **Android Studio** (Arctic Fox or newer)
2. Click **"Open"** → navigate to `ai_corrosion/android-app/`
3. Android Studio will detect the Gradle project automatically
4. Click **"Sync Now"** when prompted to download dependencies
5. Wait for Gradle sync to complete (~2 minutes first time)

---

## Backend Configuration

The app connects to the Node.js backend running on your PC.

| Scenario | URL to use |
|---|---|
| Android Emulator | `http://10.0.2.2:5000/api/` (default ✓) |
| Physical device (same Wi-Fi) | Change to `http://YOUR_PC_IP:5000/api/` |

To change: edit [`Constants.java`](app/src/main/java/com/electrolab/corrosion/utils/Constants.java) → `BASE_URL`

Make sure the backend is running:
```bash
cd ai_corrosion/backend
npm start
```

---

## Demo Login

If the backend is not running, the app will auto-login with:
- **Email:** `alex@corrosion.lab`
- **Password:** `password123`

---

## Project Structure

```
android-app/
├── app/src/main/
│   ├── AndroidManifest.xml
│   ├── java/com/electrolab/corrosion/
│   │   ├── activities/          ← Auth + Main (5 files)
│   │   ├── adapters/            ← RecyclerView + Sidebar (7 files)
│   │   ├── fragments/           ← All screens (14 files)
│   │   ├── models/              ← API POJOs (9 files)
│   │   ├── network/             ← Retrofit client + interface
│   │   └── utils/               ← Constants + SessionManager
│   └── res/
│       ├── layout/              ← 32 XML layouts
│       ├── values/              ← colors, strings, themes, dimens
│       ├── drawable/            ← gradients, buttons, badges
│       └── xml/                 ← network_security_config
└── build.gradle
```

---

## Screens Implemented

| Screen | Fragment / Activity |
|---|---|
| Splash | `SplashActivity` |
| Welcome | `WelcomeActivity` |
| Login | `LoginActivity` |
| Sign Up | `SignupActivity` |
| Forgot Password | `ForgotPasswordActivity` |
| Dashboard | `DashboardFragment` |
| Measurement Input | `MeasurementFragment` |
| Tafel Graph | `GraphFragment` |
| AI Predictions | `AIPredictionFragment` |
| Experiment History | `HistoryFragment` |
| Material Database | `MaterialDatabaseFragment` |
| Calibration | `CalibrationFragment` |
| Hardware Diagnostics | `DiagnosticsFragment` |
| Discussion | `DiscussionFragment` |
| Safety Alerts | `AlertsFragment` |
| Profile | `ProfileFragment` |
| Settings | `SettingsFragment` |
| AI Insights | `AIInsightsFragment` |
| Reports | `ReportsFragment` |
| Statistics | `StatisticsFragment` |

---

## Key Dependencies (app/build.gradle)

| Library | Purpose |
|---|---|
| `retrofit2` | REST API communication |
| `converter-gson` | JSON parsing |
| `okhttp3:logging-interceptor` | Network debugging |
| `MPAndroidChart` | Tafel polarization chart |
| `material` | Material Design components |
| `navigation-fragment` | Fragment navigation |

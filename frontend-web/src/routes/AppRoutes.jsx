import { BrowserRouter, Routes, Route } from "react-router-dom";

import ForgotPassword from "../pages/ForgotPassword";
import SplashScreen from "../pages/SplashScreen";
import WelcomeScreen from "../pages/WelcomeScreen";
import SignupScreen from "../pages/SignupScreen";
import LoginScreen from "../pages/LoginScreen";
import LoginSuccess from "../pages/LoginSuccess";

// Layout wrapper
import DashboardLayout from "../components/DashboardLayout";

// Core Pages
import DashboardHome from "../pages/DashboardHome";
import MeasurementScreen from "../pages/MeasurementScreen";
import GraphScreen from "../pages/GraphScreen";
import AIPredictionScreen from "../pages/AIPredictionScreen";
import ComparisonScreen from "../pages/ComparisonScreen";
import HistoryScreen from "../pages/HistoryScreen";
import DeviceMonitoringScreen from "../pages/DeviceMonitoringScreen";

// Reports & Alerts
import ReportsScreen from "../pages/ReportsScreen";
import AlertsScreen from "../pages/AlertsScreen";
import ProfileScreen from "../pages/ProfileScreen";
import SettingsScreen from "../pages/SettingsScreen";
import AIInsightsScreen from "../pages/AIInsightsScreen";
import FinalResultScreen from "../pages/FinalResultScreen";

// Advanced Analysis
import MaterialDatabaseScreen from "../pages/MaterialDatabaseScreen";
import EnvironmentScreen from "../pages/EnvironmentScreen";
import BatchProcessingScreen from "../pages/BatchProcessingScreen";
import TechniquesScreen from "../pages/TechniquesScreen";
import VisualizationScreen from "../pages/VisualizationScreen";
import StatisticsScreen from "../pages/StatisticsScreen";

// Data Management
import DataExportScreen from "../pages/DataExportScreen";
import DataImportScreen from "../pages/DataImportScreen";
import ArchiveScreen from "../pages/ArchiveScreen";
import StorageAnalyticsScreen from "../pages/StorageAnalyticsScreen";
import DataCleanupScreen from "../pages/DataCleanupScreen";
import BackupScreen from "../pages/BackupScreen";

// Calibration & System
import CalibrationScreen from "../pages/CalibrationScreen";
import DiagnosticsScreen from "../pages/DiagnosticsScreen";
import TeamScreen from "../pages/TeamScreen";
import SharedProjectsScreen from "../pages/SharedProjectsScreen";
import DiscussionScreen from "../pages/DiscussionScreen";
import VideoCallScreen from "../pages/VideoCallScreen";

// Training & Support
import KnowledgeBaseScreen from "../pages/KnowledgeBaseScreen";
import TrainingScreen from "../pages/TrainingScreen";
import TutorialsScreen from "../pages/TutorialsScreen";
import HelpCenterScreen from "../pages/HelpCenterScreen";
import SecurityScreen from "../pages/SecurityScreen";
import QualityControlScreen from "../pages/QualityControlScreen";
import AuditTrailScreen from "../pages/AuditTrailScreen";

// Advanced Features
import ApiIntegrationScreen from "../pages/ApiIntegrationScreen";
import WorkflowScreen from "../pages/WorkflowScreen";
import CalculatorScreen from "../pages/CalculatorScreen";
import ModelComparisonScreen from "../pages/ModelComparisonScreen";
import CustomParametersScreen from "../pages/CustomParametersScreen";
import PerformanceScreen from "../pages/PerformanceScreen";
import GlobalSettingsScreen from "../pages/GlobalSettingsScreen";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public / Auth routes */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/success" element={<LoginSuccess />} />
        <Route path="/forgot" element={<ForgotPassword />} />

        {/* Dashboard Layout sub-routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/measurement" element={<MeasurementScreen />} />
          <Route path="/graph" element={<GraphScreen />} />
          <Route path="/prediction" element={<AIPredictionScreen />}/>
          <Route path="/comparison" element={<ComparisonScreen />}/>
          <Route path="/history" element={<HistoryScreen />}/>
          <Route path="/device-monitoring" element={<DeviceMonitoringScreen />}/>
          
          <Route path="/reports" element={<ReportsScreen />}/>
          <Route path="/alerts" element={<AlertsScreen />}/>
          <Route path="/profile" element={<ProfileScreen />}/>
          <Route path="/settings" element={<SettingsScreen />}/>
          <Route path="/ai-insights" element={<AIInsightsScreen />}/>
          <Route path="/final-result" element={<FinalResultScreen />}/>

          <Route path="/materials" element={<MaterialDatabaseScreen />}/>
          <Route path="/environment" element={<EnvironmentScreen />}/>
          <Route path="/batch-processing" element={<BatchProcessingScreen />}/>
          <Route path="/techniques" element={<TechniquesScreen />}/>
          <Route path="/visualization" element={<VisualizationScreen />}/>
          <Route path="/statistics" element={<StatisticsScreen />}/>

          <Route path="/data-export" element={<DataExportScreen />}/>
          <Route path="/data-import" element={<DataImportScreen />}/>
          <Route path="/archive" element={<ArchiveScreen />}/>
          <Route path="/storage-analytics" element={<StorageAnalyticsScreen />}/>
          <Route path="/data-cleanup" element={<DataCleanupScreen />}/>
          <Route path="/backup" element={<BackupScreen />}/>

          <Route path="/calibration" element={<CalibrationScreen />}/>
          <Route path="/diagnostics" element={<DiagnosticsScreen />}/>
          <Route path="/team" element={<TeamScreen />}/>
          <Route path="/projects" element={<SharedProjectsScreen />}/>
          <Route path="/discussion" element={<DiscussionScreen />}/>
          <Route path="/video-call" element={<VideoCallScreen />}/>

          <Route path="/knowledge-base" element={<KnowledgeBaseScreen />}/>
          <Route path="/training" element={<TrainingScreen />}/>
          <Route path="/tutorials" element={<TutorialsScreen />}/>
          <Route path="/help-center" element={<HelpCenterScreen />}/>
          <Route path="/security" element={<SecurityScreen />}/>
          <Route path="/quality-control" element={<QualityControlScreen />}/>
          <Route path="/audit-trail" element={<AuditTrailScreen />}/>

          <Route path="/api-integration" element={<ApiIntegrationScreen />}/>
          <Route path="/workflow" element={<WorkflowScreen />}/>
          <Route path="/calculator" element={<CalculatorScreen />}/>
          <Route path="/model-comparison" element={<ModelComparisonScreen />}/>
          <Route path="/custom-parameters" element={<CustomParametersScreen />}/>
          <Route path="/performance" element={<PerformanceScreen />}/>
          <Route path="/global-settings" element={<GlobalSettingsScreen />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
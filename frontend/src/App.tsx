import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Copilot } from './pages/Copilot';
import { ComplianceRiskFraud } from './pages/ComplianceRiskFraud';
import { CommandCenter } from './pages/CommandCenter';
import { DocumentCenter } from './pages/DocumentCenter';
import { LandingPage } from './pages/LandingPage';
import { AgentHub } from './pages/AgentHub';
import { WorkflowBuilder } from './pages/WorkflowBuilder';
import { Architecture } from './pages/Architecture';

import { WorkflowVisualizer } from './pages/WorkflowVisualizer';
import { DocIntelligence } from './pages/DocIntelligence';
import { Analytics } from './pages/Analytics';
import { AIReports } from './pages/AIReports';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';
import { UserManagement } from './pages/UserManagement';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { Integrations } from './pages/Integrations';
import { AuditTrail } from './pages/AuditTrail';
import { SplashScreen } from './pages/SplashScreen';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useState } from 'react';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<ErrorBoundary><DashboardLayout /></ErrorBoundary>}>
        <Route index element={<CommandCenter />} />
        <Route path="documents" element={<DocumentCenter />} />
        <Route path="agents" element={<AgentHub />} />
        <Route path="workflow" element={<WorkflowVisualizer />} />
        <Route path="compliance" element={<ComplianceRiskFraud view="compliance" />} />
        <Route path="risk" element={<ComplianceRiskFraud view="risk" />} />
        <Route path="fraud" element={<ComplianceRiskFraud view="fraud" />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="reports" element={<AIReports />} />
        <Route path="copilot" element={<Copilot />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="builder" element={<WorkflowBuilder />} />
        <Route path="knowledge" element={<KnowledgeBase />} />
        <Route path="integrations" element={<Integrations />} />
        <Route path="audit" element={<AuditTrail />} />
        <Route path="architecture" element={<Architecture />} />
      </Route>
    </Routes>
  );
}

export default App;

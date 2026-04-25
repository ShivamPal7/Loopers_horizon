import { type ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './lib/useAuthStore';
import { DashboardLayout } from './pages/DashboardLayout';
import { DashboardOverview } from './pages/DashboardOverview';
import { AuthPage } from './pages/AuthPage';
import { ProfilePage } from './pages/ProfilePage';
import { LandingPage } from './components/landing/LandingPage';
import { NetWorth } from './pages/NetWorth';
import { MilestonesPage } from './pages/MilestonesPage';
import { SavingsPlan } from './pages/SavingsPlan';
import { Investments } from './pages/Investments';
import { Cashflow } from './pages/Cashflow';
import { LifeTimelinePage } from './pages/LifeTimelinePage';
import { AiAdvisor } from './pages/AiAdvisor';
import "@fontsource-variable/geist/index.css";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="net-worth" element={<NetWorth />} />
          <Route path="milestones" element={<MilestonesPage />} />
          <Route path="savings-plan" element={<SavingsPlan />} />
          <Route path="investments" element={<Investments />} />
          <Route path="cashflow" element={<Cashflow />} />
          <Route path="life-timeline" element={<LifeTimelinePage />} />
          <Route path="ai-advisor" element={<AiAdvisor />} />
        </Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

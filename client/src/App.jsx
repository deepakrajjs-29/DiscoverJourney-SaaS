import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ProfileSetup from './pages/ProfileSetup';
import Dashboard from './pages/Dashboard';
import ContentEngine from './pages/ContentEngine';
import FormattingLab from './pages/FormattingLab';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import VisibilityIntel from './pages/VisibilityIntel';
import AccountSettings from './pages/AccountSettings';

// Dashboard layout with sidebar
const DashboardLayout = () => (
  <div style={{ display: 'flex', minHeight: '100vh' }}>
    <Sidebar />
    <main style={{
      flex: 1,
      marginLeft: 260,
      minHeight: '100vh',
      overflowY: 'auto',
      background: 'var(--bg-dark)',
    }}>
      <Outlet />
    </main>
    {/* Mobile sidebar overlay - simplified */}
    <style>{`
      @media (max-width: 768px) {
        main { margin-left: 0 !important; }
        aside { display: none !important; }
      }
    `}</style>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes without sidebar */}
          <Route path="/profile-setup" element={
            <ProtectedRoute><ProfileSetup /></ProtectedRoute>
          } />

          {/* Protected routes with sidebar */}
          <Route element={
            <ProtectedRoute><DashboardLayout /></ProtectedRoute>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/content-engine" element={<ContentEngine />} />
            <Route path="/formatting-lab" element={<FormattingLab />} />
            <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
            <Route path="/visibility" element={<VisibilityIntel />} />
            <Route path="/account" element={<AccountSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

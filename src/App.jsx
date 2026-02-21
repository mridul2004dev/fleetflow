import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import Trips from './pages/Trips';
import Maintenance from './pages/Maintenance';
import Drivers from './pages/Drivers';
import Expenses from './pages/Expenses';
import Performance from './pages/Performance';
import Analytics from './pages/Analytics';

export default function App() {
  const [user, setUser] = useState(null); // Stores {username, role}

  if (!user) {
    return <Login onLogin={(userData) => setUser(userData)} />;
  }

  return (
    <Router>
      {/* Pass the role to Layout so the sidebar can adapt */}
      <Layout user={user} onLogout={() => setUser(null)}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Dispatcher & Manager Routes */}
          {(user.role === 'Fleet Manager' || user.role === 'Dispatcher') && (
            <>
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/trips" element={<Trips />} />
            </>
          )}

          {/* Safety Officer & Manager Routes */}
          {(user.role === 'Fleet Manager' || user.role === 'Safety Officer') && (
            <>
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/drivers" element={<Drivers />} />
              <Route path="/performance" element={<Performance />} />
            </>
          )}

          {/* Financial Analyst & Manager Routes */}
          {(user.role === 'Fleet Manager' || user.role === 'Financial Analyst') && (
            <>
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/analytics" element={<Analytics />} />
            </>
          )}

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}
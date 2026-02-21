import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ user, onLogout }) {
  // Fallback in case user data hasn't loaded
  if (!user) return null; 

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>FleetFlow</h2>
        <div className="user-role-badge" style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>
          {user.role}
        </div>
      </div>

      <nav className="nav-menu">
        {/* Everyone gets access to the Dashboard */}
        <NavLink to="/dashboard" className="nav-link">
          Dashboard
        </NavLink>

        {/* Dispatcher & Manager Links */}
        {(user.role === 'Fleet Manager' || user.role === 'Dispatcher') && (
          <>
            <NavLink to="/vehicles" className="nav-link">Vehicles</NavLink>
            <NavLink to="/trips" className="nav-link">Trips</NavLink>
          </>
        )}

        {/* Safety Officer & Manager Links */}
        {(user.role === 'Fleet Manager' || user.role === 'Safety Officer') && (
          <>
            <NavLink to="/maintenance" className="nav-link">Maintenance</NavLink>
            <NavLink to="/drivers" className="nav-link">Drivers</NavLink>
            <NavLink to="/performance" className="nav-link">Performance</NavLink>
          </>
        )}

        {/* Financial Analyst & Manager Links */}
        {(user.role === 'Fleet Manager' || user.role === 'Financial Analyst') && (
          <>
            <NavLink to="/expenses" className="nav-link">Expenses</NavLink>
            <NavLink to="/analytics" className="nav-link">Analytics</NavLink>
          </>
        )}
      </nav>

      <div className="sidebar-footer" style={{ marginTop: 'auto', padding: '20px' }}>
        <div style={{ marginBottom: '10px', fontSize: '0.9rem' }}>
          Logged in as: <strong>{user.username || user.name || 'User'}</strong>
        </div>
        <button className="btn-outline-sm" onClick={onLogout} style={{ width: '100%' }}>
          Logout
        </button>
      </div>
    </div>
  );
}
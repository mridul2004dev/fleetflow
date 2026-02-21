import React, { useState } from 'react';
import { db } from '../firebase';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Fleet Manager'); // Default role

  const roles = [
    'Fleet Manager',
    'Dispatcher',
    'Safety Officer',
    'Financial Analyst'
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    // Pass both username and role back to App.jsx
    onLogin({ username, role }); 
  };

  return (
    <div id="auth-screen">
      <div className="auth-card">
        
        {/* --- UPDATED HEADER SECTION --- */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '36px', margin: '0 0 8px 0', letterSpacing: '0.5px' }}>
            <span style={{ color: 'var(--green)' }}>Fleet</span>
            <span style={{ color: 'var(--text)' }}>Flow</span>
          </h1>
          <div style={{ fontSize: '15px', color: 'var(--text)', fontWeight: '500' }}>
            Role-Based Access Control
          </div>
        </div>
        {/* -------------------------------- */}
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name" 
            />
          </div>

          <div className="form-group">
            <label>Select Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
            />
          </div>

          <button type="submit" className="btn btn-primary full" style={{ marginTop: '10px' }}>
            Authorize Access →
          </button>
        </form>
      </div>
    </div>
  );
}
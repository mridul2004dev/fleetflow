import React, { useState } from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children, user, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="app-container">
      {/* 1. Hamburger Menu Symbol */}
      <button 
        className="menu-toggle-btn" 
        onClick={() => setIsMenuOpen(true)}
      >
        ☰
      </button>

      {/* 2. Slide-out Sidebar Wrapper */}
      <div className={`sidebar-wrapper ${isMenuOpen ? 'open' : ''}`}>
        
        {/* The Menu Panel */}
        <div className="sidebar-pop">
          <button className="close-btn" onClick={() => setIsMenuOpen(false)}>×</button>
          
          {/* We insert your Sidebar component here */}
          <div style={{ marginTop: '40px' }}>
            <Sidebar user={user} onLogout={onLogout} />
          </div>
        </div>

        {/* Clickable dark overlay to close the menu */}
        <div className="sidebar-overlay" onClick={() => setIsMenuOpen(false)}></div>
      </div>
      
      {/* 3. Main Dashboard Content (Full Width Now) */}
      <div className="main-content">
        <div className="main-window">
          {children}
        </div>
      </div>
    </div>
  );
}
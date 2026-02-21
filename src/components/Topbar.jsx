import React from 'react';

export default function Topbar() {
  return (
    <div className="topbar">
      <span style={{ fontSize: 12, color: "var(--muted)" }}>Live System Status</span>
      <button className="theme-toggle-single" title="Toggle theme">🌙</button>
      <button className="notif-btn" title="Notifications">
        🔔 
        <span className="notif-badge" style={{ display: "none" }}>0</span>
      </button>
    </div>
  );
}
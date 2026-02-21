import React from 'react';
import { useFleetData } from '../hooks/useFleetData';

export default function Trips() {
  const { data: trips } = useFleetData('trips');

  return (
    <div className="page active">
      <div className="window-header">
        <h2 style={{ color: 'var(--accent)', margin: 0 }}>Trip Logs</h2>
      </div>
      <div className="page-body">
        <div className="card wireframe-card">
          <table className="wireframe-table">
            <thead>
              <tr>
                <th>DRIVER</th>
                <th>VEHICLE</th>
                <th>DESTINATION</th>
                <th>WEIGHT (KG)</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((t) => (
                <tr key={t.id}>
                  <td>{t.driverName || t.driver || 'Unknown'}</td>
                  <td>{t.vehicle}</td>
                  <td>{t.destination || 'N/A'}</td>
                  <td>{t.cargoWeight}</td>
                </tr>
              ))}
              {trips.length === 0 && (
                <tr><td colSpan="4" style={{ textAlign: 'center' }}>No trips logged yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
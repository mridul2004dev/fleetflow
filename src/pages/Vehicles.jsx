import React from 'react';
import { useFleetData } from '../hooks/useFleetData';

export default function Vehicles() {
  const { data: vehicles } = useFleetData('vehicles');

  return (
    <div className="page active">
      <div className="window-header">
        <h2 style={{ color: 'var(--accent)', margin: 0 }}>Fleet Directory</h2>
        <button className="btn-wireframe">Export List</button>
      </div>
      <div className="page-body">
        <div className="card wireframe-card">
          <table className="wireframe-table">
            <thead>
              <tr>
                <th>VEHICLE NAME</th>
                <th>PLATE</th>
                <th>TYPE</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr key={v.id}>
                  <td>{v.name}</td>
                  <td>{v.plate}</td>
                  <td>{v.type}</td>
                  <td style={{ color: v.status === 'Available' ? 'var(--green)' : 'var(--orange)' }}>
                    {v.status}
                  </td>
                </tr>
              ))}
              {vehicles.length === 0 && (
                <tr><td colSpan="4" style={{ textAlign: 'center' }}>No vehicles registered yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
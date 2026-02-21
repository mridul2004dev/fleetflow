import React, { useState } from 'react';
import AddLogModal from '../components/AddLogModal';
import { db } from '../firebase';

export default function Maintenance() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logs, setLogs] = useState([]);
  
  // This would ideally come from your global state or Firebase
  const [vehicles] = useState([
    { id: 'v1', name: 'Van-05', plate: 'MH01AB1234' },
    { id: 'v2', name: 'Truck-01', plate: 'KL07CD5678' }
  ]);

  const handleAddLog = (newLog) => {
    setLogs([newLog, ...logs]);
  };

  return (
    <div className="page active">
      <div className="page-header">
        <div>
          <div className="page-title">Maintenance & Service Logs</div>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setIsModalOpen(true)}>
          + Log Service
        </button>
      </div>

      <div className="page-body">
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Type</th>
                <th>Date</th>
                <th>Cost (₹)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: 'var(--muted)' }}>No logs found.</td></tr>
              ) : (
                logs.map(log => (
                  <tr key={log.id}>
                    <td>{log.vehicleName}</td>
                    <td>{log.serviceType}</td>
                    <td>{log.date}</td>
                    <td>{log.cost}</td>
                    <td><span className="pill pill-red">{log.status}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddLogModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        vehicles={vehicles}
        onLogAdded={handleAddLog}
      />
    </div>
  );
}
import React, { useState } from 'react';
import AddDriverModal from '../components/AddDriverModal';
import { db } from '../firebase';

export default function Drivers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drivers, setDrivers] = useState([
    { id: 1, name: 'Alex Kumar', licenseNo: 'MH0120210012345', expiryDate: '2028-11-20', category: 'Truck', safetyScore: 98, status: 'On Duty' }
  ]);

  const handleAddDriver = (newDriver) => {
    setDrivers([...drivers, newDriver]);
  };

  return (
    <div className="page active">
      <div className="page-header">
        <div>
          <div className="page-title">Driver Profiles</div>
          <div className="page-sub">Compliance & safety management</div>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setIsModalOpen(true)}>
          + Add Driver
        </button>
      </div>

      <div className="page-body">
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Driver</th>
                <th>License No.</th>
                <th>Expiry</th>
                <th>Safety Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map(driver => (
                <tr key={driver.id}>
                  <td>{driver.name}</td>
                  <td><span className="mono">{driver.licenseNo}</span></td>
                  <td>{driver.expiryDate}</td>
                  <td>{driver.safetyScore}/100</td>
                  <td>
                    <span className={`pill ${driver.status === 'On Duty' ? 'pill-green' : 'pill-gray'}`}>
                      {driver.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddDriverModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onDriverAdded={handleAddDriver} 
      />
    </div>
  );
}
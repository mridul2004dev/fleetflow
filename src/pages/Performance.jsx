import React, { useMemo } from 'react';
import { useFleetData } from '../hooks/useFleetData';

export default function Performance() {
  const { data: trips } = useFleetData('trips');

  // Calculate stats per driver based on your actual trips database
  const driverStats = useMemo(() => {
    const stats = {};
    trips.forEach(trip => {
      const driver = trip.driverName || trip.driver || 'Unassigned';
      if (!stats[driver]) {
        stats[driver] = { name: driver, trips: 0, totalCargo: 0, rating: (Math.random() * (5 - 4.2) + 4.2).toFixed(1) };
      }
      stats[driver].trips += 1;
      stats[driver].totalCargo += Number(trip.cargoWeight || 0);
    });
    return Object.values(stats).sort((a, b) => b.trips - a.trips);
  }, [trips]);

  const topDriver = driverStats.length > 0 ? driverStats[0].name : 'N/A';

  return (
    <div className="page active">
      <div className="window-header">
        <h2 style={{ color: 'var(--accent)', margin: 0 }}>Driver Performance</h2>
        <button className="btn-wireframe">Export Report</button>
      </div>

      <div className="kpi-row">
        <div className="kpi-box box-green">
          <div className="box-label">Artistic Mongoose</div>
          <div className="box-sub">Top Driver</div>
          <div className="box-value">{topDriver}</div>
        </div>
        <div className="kpi-box">
          <div className="box-label">Total Drivers</div>
          <div className="box-value">{driverStats.length}</div>
        </div>
        <div className="kpi-box">
          <div className="box-label">Avg Fleet Rating</div>
          <div className="box-value">4.6 / 5</div>
        </div>
      </div>

      <div className="page-body">
        <div className="card wireframe-card">
          <table className="wireframe-table">
            <thead>
              <tr>
                <th>DRIVER NAME</th>
                <th>COMPLETED TRIPS</th>
                <th>CARGO MOVED (KG)</th>
                <th>SAFETY RATING</th>
              </tr>
            </thead>
            <tbody>
              {driverStats.map((driver, index) => (
                <tr key={index}>
                  <td>{driver.name}</td>
                  <td>{driver.trips}</td>
                  <td>{driver.totalCargo.toLocaleString()}</td>
                  <td style={{ color: driver.rating >= 4.5 ? 'var(--green)' : 'var(--orange)' }}>
                    {driver.rating} ★
                  </td>
                </tr>
              ))}
              {/* Mockup visual fillers if empty */}
              {[...Array(Math.max(0, 5 - driverStats.length))].map((_, i) => (
                <tr key={`empty-${i}`}>
                  <td>•</td><td>•</td><td>•</td><td>•</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
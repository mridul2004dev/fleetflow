import React, { useMemo } from 'react';
import { useFleetData } from '../hooks/useFleetData';

export default function Analytics() {
  const { data: trips } = useFleetData('trips');
  const { data: vehicles } = useFleetData('vehicles');

  // Simulate Financials and Analytics based on live data
  const financials = useMemo(() => {
    // 1. Revenue & Expenses
    const totalCargo = trips.reduce((sum, trip) => sum + Number(trip.cargoWeight || 0), 0);
    const revenue = totalCargo * 12.5; // Simulate $12.5 per kg
    const fuelCost = trips.length * 150; // Simulate $150 fuel per trip
    const maintenanceCost = vehicles.filter(v => v.status === 'In Shop').length * 500;
    
    const expenses = fuelCost + maintenanceCost;
    const profit = revenue - expenses;

    // 2. Utilization Rate (% of fleet currently on a trip)
    const activeTripsCount = trips.filter(t => t.status === 'On Trip' || t.status === 'Pending').length;
    const utilizationRate = vehicles.length > 0 
      ? Math.min(100, (activeTripsCount / vehicles.length) * 100).toFixed(1) 
      : 0;

    // 3. Return on Investment (ROI)
    const roi = expenses > 0 ? ((profit / expenses) * 100).toFixed(1) : 0;

    return {
      revenue,
      expenses,
      profit,
      utilizationRate,
      roi
    };
  }, [trips, vehicles]);

  return (
    <div className="page active">
      <div className="window-header">
        <h2 style={{ color: 'var(--accent)', margin: 0 }}>Operational Analytics</h2>
        <select className="btn-outline-sm">
          <option>This Month</option>
          <option>Last Quarter</option>
          <option>YTD</option>
        </select>
      </div>

      <div className="kpi-row">
        {/* Fixed: Now correctly displays Expenses */}
        <div className="kpi-box box-green">
          <div className="box-label">TOTAL EXPENSES</div>
          <div className="box-sub">Fuel & Maintenance</div>
          <div className="box-value">${financials.expenses.toLocaleString()}</div>
        </div>
        
        {/* Fixed: Now calculates actual ROI percentage or shows Net Profit */}
        <div className="kpi-box">
          <div className="box-label">NET PROFIT</div>
          <div className="box-value" style={{ color: 'var(--green)' }}>
            ${financials.profit.toLocaleString()}
          </div>
        </div>
        
        {/* New: Utilization Rate Output */}
        <div className="kpi-box">
          <div className="box-label">UTILIZATION RATE</div>
          <div className="box-value" style={{ color: 'var(--orange)' }}>
            {financials.utilizationRate}%
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="card wireframe-card" style={{ padding: '30px', textAlign: 'center' }}>
          <h3 style={{ color: '#ff7e7e', margin: '0 0 5px 0' }}>Financial Breakdown</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '13px' }}>
            Current Fleet ROI: <span style={{color: 'var(--green)'}}>{financials.roi}%</span>
          </p>
          
          {/* Visual Chart */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '100px', textAlign: 'right' }}>Revenue</div>
              <div style={{ height: '20px', background: 'var(--green)', width: '100%', borderRadius: '4px' }}></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '100px', textAlign: 'right' }}>Fuel</div>
              <div style={{ height: '20px', background: 'var(--orange)', width: '40%', borderRadius: '4px' }}></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '100px', textAlign: 'right' }}>Maintenance</div>
              <div style={{ height: '20px', background: 'var(--border2)', width: '15%', borderRadius: '4px' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
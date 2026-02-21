import React, { useState } from 'react';

export default function AddLogModal({ isOpen, onClose, vehicles, onLogAdded }) {
  const [formData, setFormData] = useState({
    vehicleId: '',
    serviceType: 'Oil Change',
    date: new Date().toISOString().split('T')[0],
    cost: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Find the vehicle to pass its name/details to the log
    const vehicle = vehicles.find(v => v.id === formData.vehicleId);
    
    const newLog = {
      ...formData,
      id: Date.now(),
      vehicleName: vehicle ? vehicle.name : 'Unknown',
      status: 'In Shop' // Automatically sets status as per requirements
    };

    onLogAdded(newLog);
    onClose();
  };

  return (
    <div className="modal-overlay open">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">Log Service Maintenance</div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Vehicle</label>
            <select 
              required 
              value={formData.vehicleId} 
              onChange={e => setFormData({...formData, vehicleId: e.target.value})}
            >
              <option value="">Choose a vehicle...</option>
              {vehicles.map(v => (
                <option key={v.id} value={v.id}>{v.name} ({v.plate})</option>
              ))}
            </select>
          </div>

          <div className="two-col">
            <div className="form-group">
              <label>Service Type</label>
              <select value={formData.serviceType} onChange={e => setFormData({...formData, serviceType: e.target.value})}>
                <option>Oil Change</option>
                <option>Tyre Rotation</option>
                <option>Brake Inspection</option>
                <option>Engine Tune-up</option>
                <option>Repairs</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
            </div>
          </div>

          <div className="form-group">
            <label>Service Cost (₹)</label>
            <input 
              type="number" 
              required 
              placeholder="2000" 
              value={formData.cost} 
              onChange={e => setFormData({...formData, cost: e.target.value})} 
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea 
              rows="2" 
              placeholder="Describe the service..." 
              value={formData.notes} 
              onChange={e => setFormData({...formData, notes: e.target.value})}
            />
          </div>

          <div className="alert-banner" style={{ background: 'rgba(34,197,94,0.06)', color: 'var(--accent)', fontSize: '12px' }}>
            ℹ️ Saving this log will set the vehicle status to <b>In Shop</b>.
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Log</button>
          </div>
        </form>
      </div>
    </div>
  );
}
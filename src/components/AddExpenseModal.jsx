import React, { useState } from 'react';

export default function AddExpenseModal({ isOpen, onClose, vehicles, onExpenseAdded }) {
  const [formData, setFormData] = useState({
    vehicleId: '',
    type: 'Fuel',
    date: new Date().toISOString().split('T')[0],
    liters: '',
    cost: '',
    tripId: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const vehicle = vehicles.find(v => v.id === formData.vehicleId);
    
    const newExpense = {
      ...formData,
      id: Date.now(),
      vehicleName: vehicle ? vehicle.name : 'Unknown',
      cost: parseFloat(formData.cost)
    };

    onExpenseAdded(newExpense);
    onClose();
  };

  return (
    <div className="modal-overlay open">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">Log Expense</div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Vehicle</label>
            <select 
              required 
              value={formData.vehicleId} 
              onChange={e => setFormData({...formData, vehicleId: e.target.value})}
            >
              <option value="">Select Vehicle...</option>
              {vehicles.map(v => (
                <option key={v.id} value={v.id}>{v.name} ({v.plate})</option>
              ))}
            </select>
          </div>

          <div className="two-col">
            <div className="form-group">
              <label>Expense Type</label>
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option>Fuel</option>
                <option>Toll</option>
                <option>Parking</option>
                <option>Miscellaneous</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
            </div>
          </div>

          <div className="two-col">
            <div className="form-group">
              <label>Liters (Fuel Only)</label>
              <input 
                type="number" 
                placeholder="40" 
                disabled={formData.type !== 'Fuel'}
                value={formData.liters} 
                onChange={e => setFormData({...formData, liters: e.target.value})} 
              />
            </div>
            <div className="form-group">
              <label>Total Cost (₹)</label>
              <input 
                type="number" 
                required 
                placeholder="3500" 
                value={formData.cost} 
                onChange={e => setFormData({...formData, cost: e.target.value})} 
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Expense</button>
          </div>
        </form>
      </div>
    </div>
  );
}
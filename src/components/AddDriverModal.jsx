import React, { useState } from 'react';

export default function AddDriverModal({ isOpen, onClose, onDriverAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    licenseNo: '',
    expiryDate: '',
    category: 'Truck',
    status: 'On Duty'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newDriver = {
      ...formData,
      id: Date.now(),
      safetyScore: 100, // New drivers start with a perfect score
      completionRate: '0%'
    };

    onDriverAdded(newDriver);
    onClose();
  };

  return (
    <div className="modal-overlay open">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">Register New Driver</div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="two-col">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                required 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                placeholder="Alex Kumar" 
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input 
                required 
                value={formData.phone} 
                onChange={e => setFormData({...formData, phone: e.target.value})} 
                placeholder="+91 98765 43210" 
              />
            </div>
          </div>

          <div className="two-col">
            <div className="form-group">
              <label>License Number</label>
              <input 
                required 
                value={formData.licenseNo} 
                onChange={e => setFormData({...formData, licenseNo: e.target.value})} 
                placeholder="MH0120210012345" 
              />
            </div>
            <div className="form-group">
              <label>License Expiry</label>
              <input 
                type="date" 
                required 
                value={formData.expiryDate} 
                onChange={e => setFormData({...formData, expiryDate: e.target.value})} 
              />
            </div>
          </div>

          <div className="two-col">
            <div className="form-group">
              <label>Vehicle Category</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option>Truck</option>
                <option>Van</option>
                <option>Bike</option>
                <option>All</option>
              </select>
            </div>
            <div className="form-group">
              <label>Initial Status</label>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                <option>On Duty</option>
                <option>Off Duty</option>
              </select>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Register Driver</button>
          </div>
        </form>
      </div>
    </div>
  );
}
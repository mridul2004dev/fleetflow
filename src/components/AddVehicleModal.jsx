import React, { useState } from 'react';

export default function AddVehicleModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    plate: '',
    type: 'Truck',
    maxCapacity: '',
    year: 2026,
    odometer: 0,
    region: 'North'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Pass the clean form data to the Firebase onAdd function
    // We remove manual ID generation because Firebase handles unique IDs automatically
    onAdd({ 
      ...formData, 
      maxCapacity: Number(formData.maxCapacity), // Ensure numbers are stored as numbers
      odometer: Number(formData.odometer)
    });
    
    // Reset form for next entry
    setFormData({
      name: '', model: '', plate: '', type: 'Truck',
      maxCapacity: '', year: 2026, odometer: 0, region: 'North'
    });
    
    onClose();
  };

  return (
    <div className="modal-overlay open">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">Add New Vehicle</div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="two-col">
            <div className="form-group">
              <label>Vehicle Name</label>
              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Van-05" />
            </div>
            <div className="form-group">
              <label>Model</label>
              <input required value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} placeholder="e.g. Tata Ace" />
            </div>
          </div>

          <div className="two-col">
            <div className="form-group">
              <label>License Plate</label>
              <input required value={formData.plate} onChange={e => setFormData({...formData, plate: e.target.value})} placeholder="MH01AB1234" />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option>Truck</option>
                <option>Van</option>
                <option>Bike</option>
              </select>
            </div>
          </div>

          <div className="two-col">
            <div className="form-group">
              <label>Max Capacity (kg)</label>
              <input required type="number" value={formData.maxCapacity} onChange={e => setFormData({...formData, maxCapacity: e.target.value})} placeholder="500" />
            </div>
            <div className="form-group">
              <label>Odometer (km)</label>
              <input required type="number" value={formData.odometer} onChange={e => setFormData({...formData, odometer: e.target.value})} />
            </div>
          </div>

          <div className="form-group">
            <label>Region</label>
            <select value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})}>
              <option>North</option>
              <option>South</option>
              <option>East</option>
              <option>West</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Vehicle</button>
          </div>
        </form>
      </div>
    </div>
  );
}
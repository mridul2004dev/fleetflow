import React, { useState } from 'react';

export default function AddTripModal({ isOpen, onClose, onDispatch, vehicles }) {
  const [formData, setFormData] = useState({
    vehicleId: '',
    driverName: '',
    cargoWeight: '',
    origin: '',
    destination: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validation: Ensure a vehicle is selected
    const selectedVehicle = vehicles.find(v => v.id === formData.vehicleId);
    if (!selectedVehicle) {
      alert("Please select a valid vehicle.");
      return;
    }

    // 2. Capacity Logic: Check if weight is too high
    if (Number(formData.cargoWeight) > selectedVehicle.maxCapacity) {
      alert(`Cargo exceeds ${selectedVehicle.name}'s capacity of ${selectedVehicle.maxCapacity}kg!`);
      return;
    }

    // 3. Dispatch to Firebase
    onDispatch({
      ...formData,
      vehicle: selectedVehicle.name, 
      type: selectedVehicle.type, // ADD THIS LINE: Saves the type (Van/Truck) to the trip!
      cargoWeight: Number(formData.cargoWeight),
      status: 'On Trip'
    });

    // Reset and close
    setFormData({ vehicleId: '', driverName: '', cargoWeight: '', origin: '', destination: '' });
    onClose();
  };

  return (
    <div className="modal-overlay open">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">Dispatch New Trip</div>
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
              <option value="">Choose an available vehicle...</option>
              {vehicles.map(v => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.maxCapacity}kg)
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Driver Name</label>
            <input 
              required 
              value={formData.driverName} 
              onChange={e => setFormData({...formData, driverName: e.target.value})} 
              placeholder="e.g. John Doe" 
            />
          </div>

          <div className="two-col">
            <div className="form-group">
              <label>Cargo Weight (kg)</label>
              <input 
                required 
                type="number" 
                value={formData.cargoWeight} 
                onChange={e => setFormData({...formData, cargoWeight: e.target.value})} 
              />
            </div>
          </div>

          <div className="two-col">
            <div className="form-group">
              <label>Origin</label>
              <input 
                required 
                value={formData.origin} 
                onChange={e => setFormData({...formData, origin: e.target.value})} 
              />
            </div>
            <div className="form-group">
              <label>Destination</label>
              <input 
                required 
                value={formData.destination} 
                onChange={e => setFormData({...formData, destination: e.target.value})} 
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Start Trip</button>
          </div>
        </form>
      </div>
    </div>
  );
}
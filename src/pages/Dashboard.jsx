import React, { useState, useMemo } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFleetData } from '../hooks/useFleetData';
import AddTripModal from '../components/AddTripModal';
import AddVehicleModal from '../components/AddVehicleModal';

export default function Dashboard() {
  const { data: trips } = useFleetData('trips');
  const { data: vehicles } = useFleetData('vehicles');

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ type: 'All', status: 'All' });
  const [isTripModalOpen, setIsTripModalOpen] = useState(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);

  // KPIs 
  const activeFleet = useMemo(() => vehicles.filter(v => v.status === 'Available').length, [vehicles]);
  const maintenanceAlerts = useMemo(() => vehicles.filter(v => v.status === 'In Shop').length, [vehicles]);
  const pendingCargo = useMemo(() => trips.filter(t => t.status === 'Pending' || t.status === 'On Trip').length, [trips]);

  // Firebase Saves
  const handleSaveVehicle = async (vehicleData) => {
    try {
      await addDoc(collection(db, 'vehicles'), {
        ...vehicleData,
        status: 'Available',
        createdAt: serverTimestamp()
      });
      setIsVehicleModalOpen(false);
    } catch (e) { console.error(e); }
  };

  const handleSaveTrip = async (tripData) => {
    try {
      await addDoc(collection(db, 'trips'), {
        ...tripData,
        createdAt: serverTimestamp()
      });
      setIsTripModalOpen(false);
    } catch (e) { console.error(e); }
  };

  // Bulletproof Filter Logic
  const filteredTrips = useMemo(() => {
    return trips.filter(t => {
      // Fallback: Check both 'driverName' and 'driver' in case of old test data
      const driverStr = (t.driverName || t.driver || "").toLowerCase();
      const vehicleStr = (t.vehicle || "").toLowerCase();
      
      const matchesSearch = driverStr.includes(searchTerm.toLowerCase()) || 
                            vehicleStr.includes(searchTerm.toLowerCase());
                            
      const matchesType = filters.type === 'All' || t.type === filters.type;
      const matchesStatus = filters.status === 'All' || t.status === filters.status;
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [trips, searchTerm, filters]);

  return (
    <div className="page active">
      <div className="window-header">
        <div className="search-container">
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Search driver or vehicle..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* FIX 1: Added value={filters.type} to force UI to match state */}
          <select 
            className="btn-outline-sm" 
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
          >
            <option value="All">Group by: Type</option>
            <option value="Truck">Trucks</option>
            <option value="Van">Vans</option>
            <option value="Bike">Bikes</option>
          </select>
          
          <select 
            className="btn-outline-sm" 
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="All">Filter: Status</option>
            <option value="On Trip">On Trip</option>
            <option value="Pending">Pending</option>
          </select>

          {/* FIX 2: Clear Filters Button if filters are hiding data */}
          {(filters.type !== 'All' || filters.status !== 'All' || searchTerm !== '') && (
            <button 
              className="btn-outline-sm" 
              onClick={() => { setFilters({type: 'All', status: 'All'}); setSearchTerm(''); }}
              style={{ borderColor: 'var(--orange)', color: 'var(--orange)' }}
            >
              Clear Filters
            </button>
          )}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
          <button className="btn-wireframe" onClick={() => setIsTripModalOpen(true)}>New Trip</button>
          <button className="btn-wireframe" onClick={() => setIsVehicleModalOpen(true)}>New Vehicle</button>
        </div>
      </div>

      <div className="kpi-row">
        <div className="kpi-box box-green">
          <div className="box-label">Active Fleet</div>
          <div className="box-value">{activeFleet}</div>
        </div>
        <div className="kpi-box">
          <div className="box-label">Maintenance Alert</div>
          <div className="box-value">{maintenanceAlerts}</div>
        </div>
        <div className="kpi-box">
          <div className="box-label">Pending Cargo</div>
          <div className="box-value">{pendingCargo}</div>
        </div>
      </div>

      <div className="page-body">
        <div className="card wireframe-card">
          <table className="wireframe-table">
            <thead>
              <tr>
                <th>TRIP</th>
                <th>VEHICLE</th>
                <th>DRIVER</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {/* FIX 3: Safety message if data exists but is filtered out */}
              {filteredTrips.length === 0 && trips.length > 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', color: 'var(--orange)', padding: '20px' }}>
                    Data is hidden by active filters. Click "Clear Filters" above.
                  </td>
                </tr>
              )}

              {filteredTrips.map((trip, index) => (
                <tr key={trip.id}>
                  <td>{index + 1}</td>
                  <td>{trip.vehicle || 'Unknown'}</td>
                  {/* Fallback to ensure driver name always shows */}
                  <td>{trip.driverName || trip.driver || 'Unassigned'}</td>
                  <td style={{ color: trip.status === 'On Trip' ? 'var(--orange)' : 'var(--accent)' }}>
                    {trip.status || 'Pending'}
                  </td>
                </tr>
              ))}
              
              {[...Array(Math.max(0, 6 - filteredTrips.length))].map((_, i) => (
                <tr key={`empty-${i}`}>
                  <td>•</td><td>•</td><td>•</td><td>•</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddTripModal isOpen={isTripModalOpen} onClose={() => setIsTripModalOpen(false)} onDispatch={handleSaveTrip} vehicles={vehicles} />
      <AddVehicleModal isOpen={isVehicleModalOpen} onClose={() => setIsVehicleModalOpen(false)} onAdd={handleSaveVehicle} />
    </div>
  );
}
import React, { useState, useMemo } from 'react';
import AddExpenseModal from '../components/AddExpenseModal';
import { db } from '../firebase';

export default function Expenses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  
  // Dummy vehicles for the dropdown
  const [vehicles] = useState([
    { id: 'v1', name: 'Van-05', plate: 'MH01AB1234' },
    { id: 'v2', name: 'Truck-01', plate: 'KL07CD5678' }
  ]);

  const handleAddExpense = (newExpense) => {
    setExpenses([newExpense, ...expenses]);
  };

  // Logic to calculate total spend for the KPI cards
  const totalSpend = useMemo(() => {
    return expenses.reduce((sum, exp) => sum + exp.cost, 0);
  }, [expenses]);

  return (
    <div className="page active">
      <div className="page-header">
        <div>
          <div className="page-title">Expenses & Fuel Logging</div>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setIsModalOpen(true)}>
          + Log Expense
        </button>
      </div>

      <div className="page-body">
        <div className="stats-row">
          <div className="stat-mini">
            <div className="val">₹{totalSpend.toLocaleString()}</div>
            <div className="lbl">Total Operational Cost</div>
          </div>
          {/* Other mini stats can go here */}
        </div>

        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Vehicle</th>
                <th>Type</th>
                <th>Cost (₹)</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(exp => (
                <tr key={exp.id}>
                  <td>{exp.date}</td>
                  <td>{exp.vehicleName}</td>
                  <td>{exp.type}</td>
                  <td>{exp.cost.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddExpenseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        vehicles={vehicles}
        onExpenseAdded={handleAddExpense}
      />
    </div>
  );
}
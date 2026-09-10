import { useState } from 'react';
import VehicleCard from '../components/VehicleCard';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const Vehicles = () => {
  const { currentUser } = useAuth();
  const { getUserVehicles, addVehicle, deleteVehicle } = useData();

  const [showAddModal, setShowAddModal] = useState(false);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [licensePlate, setLicensePlate] = useState('');
  const [vin, setVin] = useState('');
  const [fuelType, setFuelType] = useState('Gasoline');
  const [mileage, setMileage] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const userVehicles = getUserVehicles(currentUser?.id);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!make.trim() || !model.trim() || !licensePlate.trim()) {
      setError('Please fill in required fields: Make, Model, and License Plate.');
      return;
    }

    addVehicle({
      userId: currentUser.id,
      make: make.trim(),
      model: model.trim(),
      year: Number(year),
      licensePlate: licensePlate.trim().toUpperCase(),
      vin: vin.trim().toUpperCase(),
      fuelType,
      mileage: mileage ? `${mileage} miles` : 'N/A',
      notes: notes.trim()
    });

    // Reset Form
    setMake('');
    setModel('');
    setYear(new Date().getFullYear());
    setLicensePlate('');
    setVin('');
    setMileage('');
    setNotes('');
    setError('');
    setShowAddModal(false);
  };

  const handleDelete = (vehicleId) => {
    if (window.confirm('Are you sure you want to remove this vehicle from your garage?')) {
      deleteVehicle(vehicleId);
    }
  };

  return (
    <div className="py-5">
      <div className="container">
        {/* Header Bar */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-5">
          <div>
            <span className="text-primary fw-bold text-uppercase small">Customer Garage</span>
            <h1 className="display-6 fw-bold text-dark mb-1">My Vehicles</h1>
            <p className="text-secondary mb-0">
              Manage your automobiles, monitor service mileage, and quickly schedule appointments.
            </p>
          </div>
          <div>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn-primary px-4 py-2 rounded-3 fw-semibold d-inline-flex align-items-center gap-2 shadow-sm"
            >
              <i className="bi bi-plus-circle-fill"></i>
              <span>Add New Vehicle</span>
            </button>
          </div>
        </div>

        {/* Add Vehicle Modal / Form Drawer */}
        {showAddModal && (
          <div className="card carcare-card border-0 p-4 mb-5 shadow-lg bg-white border-primary border-top border-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold text-dark mb-0">
                <i className="bi bi-car-front-fill text-primary me-2"></i> Register New Automobile
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowAddModal(false)}
              ></button>
            </div>

            {error && (
              <div className="alert alert-danger py-2 small mb-3">
                {error}
              </div>
            )}

            <form onSubmit={handleAddSubmit}>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label small fw-semibold">Car Make *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. BMW, Toyota, Tesla"
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-semibold">Model *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. M3, Camry, Model 3"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-semibold">Year *</label>
                  <input
                    type="number"
                    className="form-control"
                    min="1990"
                    max={new Date().getFullYear() + 1}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label small fw-semibold">License Plate *</label>
                  <input
                    type="text"
                    className="form-control text-uppercase"
                    placeholder="e.g. TX-902-BMW"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-semibold">Fuel / Powertrain</label>
                  <select
                    className="form-select"
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                  >
                    <option value="Gasoline">Gasoline</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric (EV)">Electric (EV)</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-semibold">Odometer / Mileage</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="e.g. 42000"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-semibold">VIN (Vehicle Identification No.)</label>
                  <input
                    type="text"
                    className="form-control text-uppercase font-monospace"
                    placeholder="17-digit VIN"
                    value={vin}
                    onChange={(e) => setVin(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-semibold">Special Vehicle Notes</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Aftermarket exhaust, factory warranty expires Dec"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-4 d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-light border px-4"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary px-4 fw-semibold">
                  Save Vehicle to Garage
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Vehicles Grid */}
        {userVehicles.length > 0 ? (
          <div className="row g-4">
            {userVehicles.map((vehicle) => (
              <div key={vehicle.id} className="col-md-6 col-lg-4">
                <VehicleCard vehicle={vehicle} onDelete={handleDelete} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5 bg-white rounded-4 border p-4 max-w-700 mx-auto">
            <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 80, height: 80 }}>
              <i className="bi bi-car-front display-4"></i>
            </div>
            <h3 className="fw-bold text-dark mb-2">No Vehicles in Your Garage</h3>
            <p className="text-secondary mb-4">
              Add your car to keep track of maintenance history, scheduled checkups, and fast 1-click bookings.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn-primary px-4 py-2 rounded-3 fw-semibold"
            >
              <i className="bi bi-plus-lg me-1"></i> Add My First Vehicle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vehicles;

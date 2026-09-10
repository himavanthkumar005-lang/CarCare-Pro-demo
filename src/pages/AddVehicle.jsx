import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const AddVehicle = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addVehicle } = useData();

  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [licensePlate, setLicensePlate] = useState('');
  const [vin, setVin] = useState('');
  const [fuelType, setFuelType] = useState('Gasoline');
  const [mileage, setMileage] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!make.trim() || !model.trim() || !licensePlate.trim()) {
      setError('Please provide vehicle Make, Model, and License Plate.');
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

    navigate('/vehicles');
  };

  return (
    <div className="py-5">
      <div className="container max-w-700">
        <div className="mb-4">
          <Link to="/vehicles" className="text-secondary text-decoration-none small d-inline-flex align-items-center gap-1 mb-2">
            <i className="bi bi-arrow-left"></i> Back to My Vehicles
          </Link>
          <h2 className="fw-bold text-dark mb-1">Add Vehicle to Garage</h2>
          <p className="text-secondary">Enter your vehicle details for rapid service reservations.</p>
        </div>

        <div className="card carcare-card border-0 p-4 p-md-5 shadow-sm">
          {error && <div className="alert alert-danger py-2 small mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small fw-semibold">Car Make *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Toyota, Audi, Tesla"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold">Car Model *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Camry, A4, Model Y"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-semibold">Manufacturing Year *</label>
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

              <div className="col-md-6">
                <label className="form-label small fw-semibold">License Plate *</label>
                <input
                  type="text"
                  className="form-control text-uppercase"
                  placeholder="e.g. TX-401-ABC"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
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

              <div className="col-md-6">
                <label className="form-label small fw-semibold">Current Odometer (Miles)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g. 24500"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                />
              </div>

              <div className="col-12">
                <label className="form-label small fw-semibold">VIN Number</label>
                <input
                  type="text"
                  className="form-control text-uppercase font-monospace"
                  placeholder="17-Character VIN"
                  value={vin}
                  onChange={(e) => setVin(e.target.value)}
                />
              </div>

              <div className="col-12">
                <label className="form-label small fw-semibold">Notes / Modifications</label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Any special notes, tire sizes, or aftermarket equipment..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="mt-4 pt-3 border-top d-flex justify-content-end gap-2">
              <Link to="/vehicles" className="btn btn-light border px-4">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary px-4 fw-semibold">
                Save to Garage
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;

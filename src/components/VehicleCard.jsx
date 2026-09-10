import { Link } from 'react-router-dom';

const VehicleCard = ({ vehicle, onDelete }) => {
  return (
    <div className="card carcare-card border-0 h-100 p-3 p-lg-4">
      <div className="card-body p-0 d-flex flex-column">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-3 d-flex align-items-center justify-content-center" style={{ width: 50, height: 50 }}>
              <i className="bi bi-car-front fs-4"></i>
            </div>
            <div>
              <h5 className="fw-bold mb-0 text-dark">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h5>
              <span className="badge bg-light text-dark border px-2 py-1 mt-1 font-monospace">
                <i className="bi bi-card-heading me-1 text-primary"></i>
                {vehicle.licensePlate}
              </span>
            </div>
          </div>

          {onDelete && (
            <button
              onClick={() => onDelete(vehicle.id)}
              className="btn btn-outline-danger btn-sm rounded-circle p-1 d-flex align-items-center justify-content-center"
              style={{ width: 32, height: 32 }}
              title="Remove vehicle"
            >
              <i className="bi bi-trash"></i>
            </button>
          )}
        </div>

        {/* Specs Grid */}
        <div className="bg-light rounded-3 p-3 mb-3">
          <div className="row g-2 small">
            <div className="col-6">
              <span className="text-secondary d-block">Fuel Type</span>
              <span className="fw-semibold text-dark">
                <i className="bi bi-fuel-pump me-1 text-secondary"></i>
                {vehicle.fuelType || 'Gasoline'}
              </span>
            </div>
            <div className="col-6">
              <span className="text-secondary d-block">Current Mileage</span>
              <span className="fw-semibold text-dark">
                <i className="bi bi-speedometer2 me-1 text-secondary"></i>
                {vehicle.mileage || 'Not Recorded'}
              </span>
            </div>
            {vehicle.vin && (
              <div className="col-12 pt-2 border-top">
                <span className="text-secondary d-block">VIN</span>
                <span className="font-monospace small text-muted text-break">{vehicle.vin}</span>
              </div>
            )}
            {vehicle.notes && (
              <div className="col-12 pt-2 border-top">
                <span className="text-secondary d-block">Vehicle Notes</span>
                <span className="text-dark small fst-italic">{vehicle.notes}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto pt-2">
          <Link
            to={`/book-service?vehicleId=${vehicle.id}`}
            className="btn btn-primary w-100 py-2 fw-semibold rounded-3 d-flex align-items-center justify-content-center gap-2"
          >
            <i className="bi bi-calendar-plus"></i>
            <span>Schedule Service</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;

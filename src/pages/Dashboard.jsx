import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const Dashboard = () => {
  const { currentUser, isAdmin } = useAuth();
  const { appointments, getUserVehicles } = useData();

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const userVehicles = getUserVehicles(currentUser?.id);
  const userAppointments = appointments.filter((a) => a.userId === currentUser?.id);
  const activeBookings = userAppointments.filter(
    (a) => a.status === 'Pending' || a.status === 'Confirmed' || a.status === 'In Progress'
  );

  return (
    <div className="py-5">
      <div className="container">
        {/* Welcome Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-5">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center overflow-hidden" style={{ width: 56, height: 56 }}>
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt="" className="w-100 h-100 object-fit-cover" />
              ) : (
                <i className="bi bi-person fs-3"></i>
              )}
            </div>
            <div>
              <h1 className="h3 fw-bold text-dark mb-0">Welcome back, {currentUser?.name}!</h1>
              <span className="text-secondary small">Customer Account • Austin Service Center</span>
            </div>
          </div>

          <div className="d-flex gap-2">
            <Link to="/book-service" className="btn btn-primary px-3 py-2 fw-semibold rounded-3 d-flex align-items-center gap-2">
              <i className="bi bi-calendar-plus"></i>
              <span>Book Service</span>
            </Link>
            <Link to="/vehicles" className="btn btn-outline-secondary px-3 py-2 fw-semibold rounded-3 d-flex align-items-center gap-2">
              <i className="bi bi-car-front"></i>
              <span>My Garage</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="row g-3 mb-5">
          <div className="col-md-4">
            <div className="card carcare-card border-0 p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-secondary small fw-semibold">Registered Vehicles</span>
                  <h3 className="fw-extrabold text-dark mb-0">{userVehicles.length}</h3>
                </div>
                <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-3">
                  <i className="bi bi-car-front-fill fs-4"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card carcare-card border-0 p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-secondary small fw-semibold">Active Services</span>
                  <h3 className="fw-extrabold text-warning mb-0">{activeBookings.length}</h3>
                </div>
                <div className="bg-warning bg-opacity-10 text-warning p-3 rounded-3">
                  <i className="bi bi-clock-history fs-4"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card carcare-card border-0 p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-secondary small fw-semibold">Total Completed Jobs</span>
                  <h3 className="fw-extrabold text-success mb-0">
                    {userAppointments.filter((a) => a.status === 'Completed').length}
                  </h3>
                </div>
                <div className="bg-success bg-opacity-10 text-success p-3 rounded-3">
                  <i className="bi bi-patch-check-fill fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Appointments Preview */}
        <div className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-dark mb-0">Recent & Active Services</h5>
            <Link to="/service-history" className="small text-primary fw-semibold">
              View All History <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          {activeBookings.length > 0 ? (
            <div className="list-group list-group-flush shadow-sm rounded-4 overflow-hidden border">
              {activeBookings.map((apt) => (
                <div key={apt.id} className="list-group-item p-3 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                  <div>
                    <h6 className="fw-bold mb-1">{apt.serviceName}</h6>
                    <div className="text-secondary small">
                      <i className="bi bi-car-front me-1"></i> {apt.vehicleInfo} • <i className="bi bi-calendar me-1"></i> {apt.date} at {apt.timeSlot}
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <span className="badge bg-warning-subtle text-warning border px-3 py-1 fw-bold">
                      {apt.status}
                    </span>
                    <span className="fw-bold text-dark">${Number(apt.totalCost).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-4 rounded-4 border text-center">
              <p className="text-secondary mb-2">No active service appointments at the moment.</p>
              <Link to="/book-service" className="btn btn-primary btn-sm px-3 rounded-3">
                Schedule Service
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

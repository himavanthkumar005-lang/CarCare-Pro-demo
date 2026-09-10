import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppointmentCard from '../components/AppointmentCard';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const ServiceHistory = () => {
  const { currentUser } = useAuth();
  const { appointments, cancelAppointment } = useData();

  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Filter to current user's appointments
  const userAppointments = appointments.filter((a) => a.userId === currentUser?.id);

  // Apply status filter
  const filteredAppointments = userAppointments.filter((a) => {
    if (activeFilter === 'All') return true;
    return a.status.toLowerCase() === activeFilter.toLowerCase();
  });

  // Counters
  const counts = {
    all: userAppointments.length,
    pending: userAppointments.filter((a) => a.status === 'Pending').length,
    inProgress: userAppointments.filter((a) => a.status === 'In Progress').length,
    completed: userAppointments.filter((a) => a.status === 'Completed').length,
    cancelled: userAppointments.filter((a) => a.status === 'Cancelled').length
  };

  const handleCancel = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this service appointment?')) {
      cancelAppointment(appointmentId);
    }
  };

  return (
    <div className="py-5">
      <div className="container">
        {/* Header Bar */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <span className="text-primary fw-bold text-uppercase small">Maintenance Records</span>
            <h1 className="display-6 fw-bold text-dark mb-1">Service History</h1>
            <p className="text-secondary mb-0">
              Track live service progress, inspection findings, mechanic notes, and download invoices.
            </p>
          </div>
          <div>
            <Link to="/book-service" className="btn btn-primary px-4 py-2 rounded-3 fw-semibold d-inline-flex align-items-center gap-2">
              <i className="bi bi-calendar-plus"></i>
              <span>Book New Service</span>
            </Link>
          </div>
        </div>

        {/* Status Filter Bar */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setActiveFilter('All')}
            className={`btn btn-sm px-3 py-2 rounded-pill fw-semibold ${
              activeFilter === 'All' ? 'btn-dark' : 'btn-light border text-secondary'
            }`}
          >
            All Bookings ({counts.all})
          </button>
          <button
            onClick={() => setActiveFilter('Pending')}
            className={`btn btn-sm px-3 py-2 rounded-pill fw-semibold ${
              activeFilter === 'Pending' ? 'btn-warning text-dark' : 'btn-light border text-secondary'
            }`}
          >
            Pending ({counts.pending})
          </button>
          <button
            onClick={() => setActiveFilter('In Progress')}
            className={`btn btn-sm px-3 py-2 rounded-pill fw-semibold ${
              activeFilter === 'In Progress' ? 'btn-primary' : 'btn-light border text-secondary'
            }`}
          >
            In Progress ({counts.inProgress})
          </button>
          <button
            onClick={() => setActiveFilter('Completed')}
            className={`btn btn-sm px-3 py-2 rounded-pill fw-semibold ${
              activeFilter === 'Completed' ? 'btn-success' : 'btn-light border text-secondary'
            }`}
          >
            Completed ({counts.completed})
          </button>
          <button
            onClick={() => setActiveFilter('Cancelled')}
            className={`btn btn-sm px-3 py-2 rounded-pill fw-semibold ${
              activeFilter === 'Cancelled' ? 'btn-danger' : 'btn-light border text-secondary'
            }`}
          >
            Cancelled ({counts.cancelled})
          </button>
        </div>

        {/* Appointments List */}
        {filteredAppointments.length > 0 ? (
          <div>
            {filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onCancel={handleCancel}
                onViewInvoice={(apt) => setSelectedInvoice(apt)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-5 bg-white rounded-4 border p-4 max-w-700 mx-auto shadow-sm">
            <div className="bg-light text-muted rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 80, height: 80 }}>
              <i className="bi bi-clock-history display-4"></i>
            </div>
            <h4 className="fw-bold text-dark mb-2">No Service Records Found</h4>
            <p className="text-secondary mb-4">
              {activeFilter === 'All'
                ? "You haven't scheduled any automobile services with us yet."
                : `No services currently found under "${activeFilter}" status.`}
            </p>
            <Link to="/book-service" className="btn btn-primary px-4 py-2 rounded-3 fw-semibold">
              <i className="bi bi-calendar-check me-2"></i> Book Your First Service
            </Link>
          </div>
        )}

        {/* Invoice Modal */}
        {selectedInvoice && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="modal-header bg-dark text-white border-0 py-3">
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-car-front-fill text-primary fs-4"></i>
                    <div>
                      <h5 className="modal-title fw-bold mb-0">CarCare-Pro Center Invoice</h5>
                      <small className="text-secondary font-monospace">#{selectedInvoice.id}</small>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setSelectedInvoice(null)}
                  ></button>
                </div>

                <div className="modal-body p-4 p-md-5">
                  {/* Company & Client Header */}
                  <div className="row g-4 mb-4 pb-4 border-bottom">
                    <div className="col-sm-6">
                      <h6 className="fw-bold text-primary mb-1">Service Facility:</h6>
                      <div className="fw-bold text-dark">CarCare-Pro Automobile Center</div>
                      <div className="text-secondary small">400 Motorway Parkway, Suite 10</div>
                      <div className="text-secondary small">Austin, TX 78701</div>
                      <div className="text-secondary small">Desk: (800) 227-2273</div>
                    </div>
                    <div className="col-sm-6 text-sm-end">
                      <h6 className="fw-bold text-secondary mb-1">Billed To Customer:</h6>
                      <div className="fw-bold text-dark">{selectedInvoice.userName}</div>
                      <div className="text-secondary small">{selectedInvoice.userEmail}</div>
                      <div className="text-secondary small">{selectedInvoice.userPhone}</div>
                      <div className="text-secondary small">Date: {selectedInvoice.date}</div>
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="bg-light p-3 rounded-3 mb-4 border">
                    <div className="row g-2 small">
                      <div className="col-sm-6">
                        <strong className="text-secondary">Vehicle:</strong> {selectedInvoice.vehicleInfo}
                      </div>
                      <div className="col-sm-6 text-sm-end">
                        <strong className="text-secondary">Master Mechanic:</strong> {selectedInvoice.assignedMechanic || 'Master Technician'}
                      </div>
                    </div>
                  </div>

                  {/* Line Items Table */}
                  <div className="table-responsive mb-4">
                    <table className="table table-bordered align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>Description</th>
                          <th className="text-center" style={{ width: 100 }}>Qty</th>
                          <th className="text-end" style={{ width: 140 }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="fw-bold">{selectedInvoice.serviceName}</div>
                            <small className="text-secondary">Comprehensive service and multi-point inspection</small>
                          </td>
                          <td className="text-center">1</td>
                          <td className="text-end fw-semibold">${Number(selectedInvoice.totalCost).toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="fw-bold">Environmental & Waste Fluid Disposal</div>
                            <small className="text-secondary">Eco-safe disposal & recycling of fluids</small>
                          </td>
                          <td className="text-center">1</td>
                          <td className="text-end text-success fw-semibold">FREE (Covered)</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="2" className="text-end fw-bold">Subtotal:</td>
                          <td className="text-end fw-bold">${Number(selectedInvoice.totalCost).toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="text-end fw-bold">Tax (0% Service Exemption):</td>
                          <td className="text-end">$0.00</td>
                        </tr>
                        <tr className="table-primary">
                          <td colSpan="2" className="text-end fs-5 fw-extrabold text-primary">Total Paid / Due:</td>
                          <td className="text-end fs-5 fw-extrabold text-primary">${Number(selectedInvoice.totalCost).toFixed(2)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  {selectedInvoice.technicianNotes && (
                    <div className="p-3 bg-light rounded-3 border-start border-4 border-success small mb-3">
                      <strong className="text-success d-block mb-1">Technician Inspection Signoff:</strong>
                      <span>{selectedInvoice.technicianNotes}</span>
                    </div>
                  )}
                </div>

                <div className="modal-footer bg-light border-0 py-3">
                  <button
                    type="button"
                    className="btn btn-secondary px-4"
                    onClick={() => setSelectedInvoice(null)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary px-4 d-flex align-items-center gap-2"
                    onClick={() => window.print()}
                  >
                    <i className="bi bi-printer"></i>
                    <span>Print Receipt</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceHistory;

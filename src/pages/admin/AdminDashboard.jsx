import { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const MECHANICS = [
  'Dave Miller (Senior Technician)',
  'Carlos Rodriguez (Brake Specialist)',
  'Leo Wang (Detailing & Body Lead)',
  'Markus Vance (Engine & Diagnostics)',
  'Sarah Connor (Hybrid & EV Master)'
];

const AdminDashboard = () => {
  const { users } = useAuth();
  const {
    services,
    vehicles,
    appointments,
    updateAppointmentStatus,
    addService,
    updateService,
    deleteService,
    resetToDefaultData
  } = useData();

  const [activeTab, setActiveTab] = useState('appointments'); // appointments, services, vehicles, users
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Appointment Editing Modal State
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editStatus, setEditStatus] = useState('Pending');
  const [editMechanic, setEditMechanic] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [editCost, setEditCost] = useState('');

  // Service Management Modal State
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    name: '',
    category: 'Maintenance',
    price: '',
    duration: '1 - 2 hours',
    shortDescription: '',
    badge: 'Popular',
    icon: 'bi-wrench-adjustable'
  });

  // Calculate Metrics
  const totalRevenue = appointments
    .filter((a) => a.status === 'Completed')
    .reduce((sum, a) => sum + Number(a.totalCost || 0), 0);

  const pendingCount = appointments.filter((a) => a.status === 'Pending').length;
  const inProgressCount = appointments.filter((a) => a.status === 'In Progress').length;
  const completedCount = appointments.filter((a) => a.status === 'Completed').length;

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      const matchStatus = statusFilter === 'All' || apt.status.toLowerCase() === statusFilter.toLowerCase();
      const matchSearch =
        apt.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.vehicleInfo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [appointments, statusFilter, searchTerm]);

  // Open Appointment Edit Modal
  const handleOpenEditModal = (apt) => {
    setSelectedAppointment(apt);
    setEditStatus(apt.status);
    setEditMechanic(apt.assignedMechanic || MECHANICS[0]);
    setEditNotes(apt.technicianNotes || '');
    setEditCost(apt.totalCost || '');
  };

  // Save Appointment Changes
  const handleSaveAppointment = (e) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    updateAppointmentStatus(
      selectedAppointment.id,
      editStatus,
      editNotes,
      editMechanic,
      editCost
    );
    setSelectedAppointment(null);
  };

  // Service Modal helpers
  const handleOpenNewService = () => {
    setEditingServiceId(null);
    setServiceForm({
      name: '',
      category: 'Maintenance',
      price: '',
      duration: '1 - 2 hours',
      shortDescription: '',
      badge: 'New',
      icon: 'bi-wrench'
    });
    setShowServiceModal(true);
  };

  const handleEditService = (service) => {
    setEditingServiceId(service.id);
    setServiceForm({
      name: service.name,
      category: service.category,
      price: service.price,
      duration: service.duration,
      shortDescription: service.shortDescription,
      badge: service.badge || '',
      icon: service.icon || 'bi-wrench'
    });
    setShowServiceModal(true);
  };

  const handleSaveService = (e) => {
    e.preventDefault();
    if (!serviceForm.name || !serviceForm.price) return;

    if (editingServiceId) {
      updateService(editingServiceId, serviceForm);
    } else {
      addService(serviceForm);
    }
    setShowServiceModal(false);
  };

  const handleDeleteService = (id) => {
    if (window.confirm('Delete this service package from the catalog?')) {
      deleteService(id);
    }
  };

  return (
    <div className="py-4 py-lg-5 bg-light min-vh-100">
      <div className="container-fluid px-lg-5">
        {/* Dashboard Top Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-danger text-white px-3 py-1">ADMINISTRATOR DESK</span>
              <span className="text-secondary small font-monospace">AUTO MOBILE CENTER OS v2.0</span>
            </div>
            <h1 className="display-6 fw-bold text-dark mb-0">Workshop Control Center</h1>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              onClick={() => {
                if (window.confirm('Reset all bookings, services, and vehicles to default seed JSON data?')) {
                  resetToDefaultData();
                }
              }}
              className="btn btn-outline-secondary btn-sm px-3 rounded-3 d-flex align-items-center gap-1"
              title="Restores original JSON datasets"
            >
              <i className="bi bi-arrow-counterclockwise"></i>
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>

        {/* Top KPI Metrics Row */}
        <div className="row g-3 mb-4">
          <div className="col-sm-6 col-xl-3">
            <div className="card carcare-card border-0 p-3 p-xl-4 card-stat">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-secondary small fw-semibold">Total Service Bookings</span>
                  <h3 className="fw-extrabold text-dark mb-0">{appointments.length}</h3>
                </div>
                <div className="service-icon-box">
                  <i className="bi bi-calendar-range fs-4"></i>
                </div>
              </div>
              <div className="mt-2 text-muted small">
                <span className="text-danger fw-bold">{pendingCount} Pending</span> action
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-xl-3">
            <div className="card carcare-card border-0 p-3 p-xl-4" style={{ borderLeft: '4px solid #dc2626' }}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-secondary small fw-semibold">In Service Bays</span>
                  <h3 className="fw-extrabold text-dark mb-0">{inProgressCount}</h3>
                </div>
                <div className="service-icon-box">
                  <i className="bi bi-gear-wide-connected fs-4"></i>
                </div>
              </div>
              <div className="mt-2 text-muted small">Active on technician lifts</div>
            </div>
          </div>

          <div className="col-sm-6 col-xl-3">
            <div className="card carcare-card border-0 p-3 p-xl-4" style={{ borderLeft: '4px solid #dc2626' }}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-secondary small fw-semibold">Completed Revenue</span>
                  <h3 className="fw-extrabold text-danger mb-0">${totalRevenue.toFixed(2)}</h3>
                </div>
                <div className="service-icon-box">
                  <i className="bi bi-cash-coin fs-4"></i>
                </div>
              </div>
              <div className="mt-2 text-muted small">
                <span className="text-danger fw-bold">{completedCount} Jobs</span> delivered
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-xl-3">
            <div className="card carcare-card border-0 p-3 p-xl-4" style={{ borderLeft: '4px solid #dc2626' }}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-secondary small fw-semibold">Client Fleet & Users</span>
                  <h3 className="fw-extrabold text-dark mb-0">{vehicles.length} Cars</h3>
                </div>
                <div className="service-icon-box">
                  <i className="bi bi-people-fill fs-4"></i>
                </div>
              </div>
              <div className="mt-2 text-muted small">{users.length} registered profiles</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="card carcare-card border-0 shadow-sm mb-4">
          <div className="card-header bg-white border-bottom p-3">
            <ul className="nav nav-pills card-header-pills gap-2">
              <li className="nav-item">
                <button
                  className={`nav-link fw-semibold px-4 ${activeTab === 'appointments' ? 'active bg-primary' : 'text-secondary'}`}
                  onClick={() => setActiveTab('appointments')}
                >
                  <i className="bi bi-calendar2-check me-2"></i> Service Bookings ({appointments.length})
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link fw-semibold px-4 ${activeTab === 'services' ? 'active bg-primary' : 'text-secondary'}`}
                  onClick={() => setActiveTab('services')}
                >
                  <i className="bi bi-tools me-2"></i> Services Catalog ({services.length})
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link fw-semibold px-4 ${activeTab === 'vehicles' ? 'active bg-primary' : 'text-secondary'}`}
                  onClick={() => setActiveTab('vehicles')}
                >
                  <i className="bi bi-car-front me-2"></i> Customer Vehicles ({vehicles.length})
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link fw-semibold px-4 ${activeTab === 'users' ? 'active bg-primary' : 'text-secondary'}`}
                  onClick={() => setActiveTab('users')}
                >
                  <i className="bi bi-person-badge me-2"></i> Users & Clients ({users.length})
                </button>
              </li>
            </ul>
          </div>

          <div className="card-body p-4">
            {/* TAB 1: APPOINTMENTS */}
            {activeTab === 'appointments' && (
              <div>
                {/* Filters */}
                <div className="row g-3 align-items-center mb-4">
                  <div className="col-md-5">
                    <div className="input-group">
                      <span className="input-group-text bg-light text-secondary border-end-0">
                        <i className="bi bi-search"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control bg-light border-start-0 ps-0 shadow-none"
                        placeholder="Search by customer, car, or service..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="d-flex flex-wrap gap-2 justify-content-md-end">
                      {['All', 'Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'].map((status) => (
                        <button
                          key={status}
                          onClick={() => setStatusFilter(status)}
                          className={`btn btn-sm px-3 rounded-pill fw-semibold ${
                            statusFilter === status
                              ? 'btn-dark'
                              : 'btn-light border text-secondary'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Appointments Table */}
                <div className="table-responsive table-responsive-custom">
                  <table className="table table-hover align-middle">
                    <thead>
                      <tr>
                        <th>ID & Customer</th>
                        <th>Vehicle Details</th>
                        <th>Service Package</th>
                        <th>Schedule</th>
                        <th>Assigned Mechanic</th>
                        <th>Status</th>
                        <th>Cost</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAppointments.length > 0 ? (
                        filteredAppointments.map((apt) => (
                          <tr key={apt.id}>
                            <td>
                              <div className="fw-bold text-dark">{apt.userName}</div>
                              <small className="text-secondary font-monospace">#{apt.id}</small>
                              <div className="small text-muted">{apt.userPhone}</div>
                            </td>
                            <td>
                              <span className="fw-semibold text-dark d-block">{apt.vehicleInfo}</span>
                            </td>
                            <td>
                              <span className="badge bg-light text-primary border">{apt.serviceName}</span>
                            </td>
                            <td>
                              <div className="small fw-semibold">{apt.date}</div>
                              <small className="text-muted">{apt.timeSlot}</small>
                            </td>
                            <td>
                              <span className="small text-secondary">
                                {apt.assignedMechanic || <em className="text-muted">Unassigned</em>}
                              </span>
                            </td>
                            <td>
                              {apt.status === 'Pending' && <span className="badge badge-status badge-status-pending">Pending</span>}
                              {apt.status === 'Confirmed' && <span className="badge badge-status badge-status-confirmed">Confirmed</span>}
                              {apt.status === 'In Progress' && <span className="badge badge-status badge-status-in-progress">In Progress</span>}
                              {apt.status === 'Completed' && <span className="badge badge-status badge-status-completed">Completed</span>}
                              {apt.status === 'Cancelled' && <span className="badge badge-status badge-status-cancelled">Cancelled</span>}
                            </td>
                            <td>
                              <span className="fw-bold text-dark">${Number(apt.totalCost || 0).toFixed(2)}</span>
                            </td>
                            <td className="text-end">
                              <button
                                onClick={() => handleOpenEditModal(apt)}
                                className="btn btn-primary btn-sm px-3 rounded-2 fw-semibold"
                              >
                                <i className="bi bi-pencil-square me-1"></i> Manage
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="text-center py-5 text-secondary">
                            No service bookings found matching criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: SERVICES CATALOG */}
            {activeTab === 'services' && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0">Automobile Services Catalog</h5>
                  <button onClick={handleOpenNewService} className="btn btn-primary btn-sm px-3 rounded-3 fw-semibold">
                    <i className="bi bi-plus-circle me-1"></i> Add New Package
                  </button>
                </div>

                <div className="table-responsive table-responsive-custom">
                  <table className="table table-hover align-middle">
                    <thead>
                      <tr>
                        <th>Service Name</th>
                        <th>Category</th>
                        <th>Duration</th>
                        <th>Price</th>
                        <th>Badge</th>
                        <th className="text-end">Manage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((srv) => (
                        <tr key={srv.id}>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div className="bg-light p-2 rounded-2 text-primary">
                                <i className={`bi ${srv.icon || 'bi-wrench'}`}></i>
                              </div>
                              <div>
                                <div className="fw-bold text-dark">{srv.name}</div>
                                <small className="text-secondary">{srv.shortDescription}</small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-secondary-subtle text-dark">{srv.category}</span>
                          </td>
                          <td>{srv.duration}</td>
                          <td className="fw-bold text-primary">${Number(srv.price).toFixed(2)}</td>
                          <td>
                            {srv.badge && <span className="badge bg-primary-subtle text-primary">{srv.badge}</span>}
                          </td>
                          <td className="text-end">
                            <button
                              onClick={() => handleEditService(srv)}
                              className="btn btn-outline-primary btn-sm me-2 rounded-2"
                              title="Edit service"
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button
                              onClick={() => handleDeleteService(srv.id)}
                              className="btn btn-outline-danger btn-sm rounded-2"
                              title="Delete service"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: VEHICLES */}
            {activeTab === 'vehicles' && (
              <div>
                <h5 className="fw-bold mb-4">Customer Registered Vehicles</h5>
                <div className="table-responsive table-responsive-custom">
                  <table className="table table-hover align-middle">
                    <thead>
                      <tr>
                        <th>Vehicle</th>
                        <th>License Plate</th>
                        <th>Fuel / Powertrain</th>
                        <th>Odometer</th>
                        <th>VIN</th>
                        <th>Owner ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicles.map((v) => (
                        <tr key={v.id}>
                          <td>
                            <div className="fw-bold text-dark">{v.year} {v.make} {v.model}</div>
                            <small className="text-muted">{v.notes || 'Standard specifications'}</small>
                          </td>
                          <td>
                            <span className="badge bg-light text-dark border font-monospace px-2 py-1">
                              {v.licensePlate}
                            </span>
                          </td>
                          <td>{v.fuelType || 'Gasoline'}</td>
                          <td>{v.mileage || 'N/A'}</td>
                          <td className="font-monospace small text-muted">{v.vin || 'Not Registered'}</td>
                          <td className="small font-monospace text-secondary">{v.userId}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: USERS */}
            {activeTab === 'users' && (
              <div>
                <h5 className="fw-bold mb-4">System User Accounts</h5>
                <div className="table-responsive table-responsive-custom">
                  <table className="table table-hover align-middle">
                    <thead>
                      <tr>
                        <th>User Profile</th>
                        <th>Role</th>
                        <th>Phone</th>
                        <th>Location</th>
                        <th>Registered</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id}>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center overflow-hidden" style={{ width: 36, height: 36 }}>
                                {u.avatar ? <img src={u.avatar} alt="" className="w-100 h-100 object-fit-cover" /> : <i className="bi bi-person"></i>}
                              </div>
                              <div>
                                <div className="fw-bold text-dark">{u.name}</div>
                                <small className="text-secondary">{u.email}</small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={`badge ${u.role === 'admin' ? 'bg-danger text-white' : 'bg-primary text-white'}`}>
                              {u.role.toUpperCase()}
                            </span>
                          </td>
                          <td>{u.phone || 'N/A'}</td>
                          <td>{u.address || 'N/A'}</td>
                          <td>{u.createdAt || '2026'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* APPOINTMENT MANAGEMENT MODAL */}
        {selectedAppointment && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                <form onSubmit={handleSaveAppointment}>
                  <div className="modal-header bg-dark text-white border-0 py-3">
                    <div>
                      <h5 className="modal-title fw-bold">Manage Booking #{selectedAppointment.id}</h5>
                      <small className="text-secondary">{selectedAppointment.serviceName} - {selectedAppointment.userName}</small>
                    </div>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      onClick={() => setSelectedAppointment(null)}
                    ></button>
                  </div>

                  <div className="modal-body p-4">
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-dark">Status</label>
                        <select
                          className="form-select"
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-dark">Assign Master Mechanic</label>
                        <select
                          className="form-select"
                          value={editMechanic}
                          onChange={(e) => setEditMechanic(e.target.value)}
                        >
                          {MECHANICS.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-dark">Final Service Cost ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          value={editCost}
                          onChange={(e) => setEditCost(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-dark">Vehicle</label>
                        <input
                          type="text"
                          className="form-control bg-light"
                          value={selectedAppointment.vehicleInfo}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-dark">Customer Symptoms / Remarks</label>
                      <div className="p-3 bg-light rounded-3 text-secondary small">
                        {selectedAppointment.customerNotes || 'No specific remarks provided by customer.'}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-semibold text-dark">Technician Inspection & Bay Notes</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Log inspection findings, parts replaced, torque specs, battery health, etc..."
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                      ></textarea>
                    </div>
                  </div>

                  <div className="modal-footer bg-light border-0 py-3">
                    <button
                      type="button"
                      className="btn btn-secondary px-4"
                      onClick={() => setSelectedAppointment(null)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary px-4 fw-semibold">
                      Save & Update Record
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* SERVICE ADD/EDIT MODAL */}
        {showServiceModal && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                <form onSubmit={handleSaveService}>
                  <div className="modal-header bg-dark text-white border-0 py-3">
                    <h5 className="modal-title fw-bold">
                      {editingServiceId ? 'Edit Service Package' : 'Create New Service Package'}
                    </h5>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      onClick={() => setShowServiceModal(false)}
                    ></button>
                  </div>

                  <div className="modal-body p-4">
                    <div className="mb-3">
                      <label className="form-label small fw-semibold">Package Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={serviceForm.name}
                        onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-sm-6">
                        <label className="form-label small fw-semibold">Category</label>
                        <select
                          className="form-select"
                          value={serviceForm.category}
                          onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                        >
                          <option value="Maintenance">Maintenance</option>
                          <option value="Repairs">Repairs</option>
                          <option value="Diagnostics">Diagnostics</option>
                          <option value="Comfort">Comfort</option>
                          <option value="Detailing">Detailing</option>
                          <option value="Tires">Tires</option>
                          <option value="Electrical">Electrical</option>
                          <option value="Drivetrain">Drivetrain</option>
                        </select>
                      </div>

                      <div className="col-sm-6">
                        <label className="form-label small fw-semibold">Base Price ($) *</label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          value={serviceForm.price}
                          onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-sm-6">
                        <label className="form-label small fw-semibold">Estimated Duration</label>
                        <input
                          type="text"
                          className="form-control"
                          value={serviceForm.duration}
                          onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                        />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label small fw-semibold">Highlight Badge</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Popular, Premium"
                          value={serviceForm.badge}
                          onChange={(e) => setServiceForm({ ...serviceForm, badge: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-semibold">Description</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={serviceForm.shortDescription}
                        onChange={(e) => setServiceForm({ ...serviceForm, shortDescription: e.target.value })}
                      ></textarea>
                    </div>
                  </div>

                  <div className="modal-footer bg-light border-0 py-3">
                    <button
                      type="button"
                      className="btn btn-secondary px-4"
                      onClick={() => setShowServiceModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary px-4 fw-semibold">
                      Save Package
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

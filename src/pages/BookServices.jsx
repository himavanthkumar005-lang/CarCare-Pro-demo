import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const TIME_SLOTS = [
  '08:30 AM - 10:00 AM',
  '10:00 AM - 11:30 AM',
  '11:30 AM - 01:00 PM',
  '02:00 PM - 03:30 PM',
  '03:30 PM - 05:00 PM',
  '05:00 PM - 06:30 PM'
];

const BookServices = () => {
  const [searchParams] = useSearchParams();
  const { currentUser, isAuthenticated } = useAuth();
  const { services, getUserVehicles, addVehicle, bookAppointment } = useData();

  const preselectedServiceId = searchParams.get('serviceId') || '';
  const preselectedVehicleId = searchParams.get('vehicleId') || '';

  // User's vehicles
  const userVehicles = getUserVehicles(currentUser?.id);

  // Form State initialized directly from URL params or default values
  const [serviceId, setServiceId] = useState(
    preselectedServiceId || (services[0]?.id || '')
  );
  
  const [vehicleChoice, setVehicleChoice] = useState(() => {
    if (preselectedVehicleId) return 'existing';
    return userVehicles.length > 0 ? 'existing' : 'new';
  });

  const [selectedVehicleId, setSelectedVehicleId] = useState(() => {
    if (preselectedVehicleId) return preselectedVehicleId;
    return userVehicles[0]?.id || '';
  });

  // New Vehicle inputs if choice is 'new'
  const [newVehicle, setNewVehicle] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    licensePlate: '',
    fuelType: 'Gasoline',
    mileage: ''
  });

  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });

  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [customerNotes, setCustomerNotes] = useState('');
  const [contactPhone, setContactPhone] = useState(currentUser?.phone || '');
  const [submittedBooking, setSubmittedBooking] = useState(null);
  const [error, setError] = useState('');

  const selectedServiceObj = services.find((s) => s.id === serviceId) || services[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!isAuthenticated) {
      setError('Please sign in or register to book your service appointment.');
      return;
    }

    if (!serviceId) {
      setError('Please select a service package.');
      return;
    }

    let bookingVehicleId;
    let bookingVehicleInfo;

    if (vehicleChoice === 'new') {
      if (!newVehicle.make || !newVehicle.model || !newVehicle.licensePlate) {
        setError('Please provide your car Make, Model, and License Plate number.');
        return;
      }
      // Save new vehicle to user's garage
      const createdVeh = addVehicle({
        userId: currentUser.id,
        make: newVehicle.make,
        model: newVehicle.model,
        year: Number(newVehicle.year),
        licensePlate: newVehicle.licensePlate.toUpperCase(),
        fuelType: newVehicle.fuelType,
        mileage: newVehicle.mileage ? `${newVehicle.mileage} miles` : 'N/A'
      });
      bookingVehicleId = createdVeh.id;
      bookingVehicleInfo = `${createdVeh.year} ${createdVeh.make} ${createdVeh.model} (${createdVeh.licensePlate})`;
    } else {
      const foundVeh = userVehicles.find((v) => v.id === selectedVehicleId) || userVehicles[0];
      if (!foundVeh) {
        setError('Please select a valid vehicle from your registered vehicles or add a new one.');
        return;
      }
      bookingVehicleId = foundVeh.id;
      bookingVehicleInfo = `${foundVeh.year} ${foundVeh.make} ${foundVeh.model} (${foundVeh.licensePlate})`;
    }

    // Save appointment
    const booking = bookAppointment({
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userPhone: contactPhone || currentUser.phone || 'N/A',
      vehicleId: bookingVehicleId,
      vehicleInfo: bookingVehicleInfo,
      serviceId: selectedServiceObj.id,
      serviceName: selectedServiceObj.name,
      date,
      timeSlot,
      totalCost: selectedServiceObj.price,
      customerNotes
    });

    setSubmittedBooking(booking);
  };

  return (
    <div className="py-5">
      <div className="container">
        {/* Page Title */}
        <div className="text-center max-w-700 mx-auto mb-5">
          <span className="text-primary fw-bold text-uppercase small">Easy Online Reservation</span>
          <h1 className="display-5 fw-bold text-dark mb-2">Book a Service Appointment</h1>
          <p className="text-secondary">
            Select your car, choose your service package, and reserve your preferred bay and master technician slot.
          </p>
        </div>

        {/* Confirmation State */}
        {submittedBooking ? (
          <div className="card carcare-card border-0 p-4 p-md-5 max-w-700 mx-auto text-center shadow-lg">
            <div className="bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 80, height: 80 }}>
              <i className="bi bi-check2-circle display-4"></i>
            </div>

            <h2 className="fw-bold text-dark mb-2">Appointment Reserved!</h2>
            <p className="text-secondary mb-4">
              Your service request has been received. Our team will review the details and confirm your bay.
            </p>

            <div className="bg-light rounded-4 p-4 text-start mb-4 border">
              <div className="d-flex justify-content-between border-bottom pb-2 mb-3">
                <span className="text-secondary small">Booking Reference:</span>
                <span className="font-monospace fw-bold text-primary">{submittedBooking.id}</span>
              </div>
              <div className="d-flex justify-content-between border-bottom pb-2 mb-3">
                <span className="text-secondary small">Service:</span>
                <span className="fw-semibold text-dark">{submittedBooking.serviceName}</span>
              </div>
              <div className="d-flex justify-content-between border-bottom pb-2 mb-3">
                <span className="text-secondary small">Vehicle:</span>
                <span className="fw-semibold text-dark">{submittedBooking.vehicleInfo}</span>
              </div>
              <div className="d-flex justify-content-between border-bottom pb-2 mb-3">
                <span className="text-secondary small">Date & Slot:</span>
                <span className="fw-semibold text-dark">{submittedBooking.date} at {submittedBooking.timeSlot}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-secondary small">Estimated Total:</span>
                <span className="fs-5 fw-bold text-success">${Number(submittedBooking.totalCost).toFixed(2)}</span>
              </div>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <Link to="/service-history" className="btn btn-primary px-4 py-2 rounded-3 fw-semibold">
                <i className="bi bi-clock-history me-2"></i> View in Service History
              </Link>
              <button
                onClick={() => {
                  setSubmittedBooking(null);
                  setCustomerNotes('');
                }}
                className="btn btn-outline-secondary px-4 py-2 rounded-3 fw-semibold"
              >
                Book Another Service
              </button>
            </div>
          </div>
        ) : (
          <div className="row g-4 justify-content-center">
            {/* Booking Form Column */}
            <div className="col-lg-8">
              <div className="card carcare-card border-0 p-4 p-md-5 shadow-sm">
                {!isAuthenticated && (
                  <div className="alert alert-warning d-flex align-items-center gap-3 mb-4 rounded-3" role="alert">
                    <i className="bi bi-exclamation-triangle-fill fs-4 flex-shrink-0"></i>
                    <div>
                      <strong>Account required:</strong> You are browsing as a guest. Please{' '}
                      <Link to="/login" className="alert-link text-decoration-underline">
                        sign in
                      </Link>{' '}
                      or{' '}
                      <Link to="/register" className="alert-link text-decoration-underline">
                        create an account
                      </Link>{' '}
                      to link your vehicle and confirm your appointment.
                    </div>
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger alert-dismissible fade show rounded-3" role="alert">
                    <i className="bi bi-exclamation-circle-fill me-2"></i>
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError('')}></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Step 1: Select Service */}
                  <div className="mb-4">
                    <label className="form-label fw-bold text-dark d-flex align-items-center gap-2">
                      <span className="badge bg-primary rounded-circle">1</span>
                      Select Automobile Service Package
                    </label>
                    <select
                      className="form-select form-select-lg"
                      value={serviceId}
                      onChange={(e) => setServiceId(e.target.value)}
                      required
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} - ${Number(s.price).toFixed(2)} ({s.duration})
                        </option>
                      ))}
                    </select>
                    {selectedServiceObj && (
                      <div className="form-text mt-2 text-muted">
                        <i className="bi bi-info-circle me-1"></i>
                        {selectedServiceObj.shortDescription}
                      </div>
                    )}
                  </div>

                  {/* Step 2: Vehicle Selection */}
                  <div className="mb-4">
                    <label className="form-label fw-bold text-dark d-flex align-items-center gap-2">
                      <span className="badge bg-primary rounded-circle">2</span>
                      Vehicle Information
                    </label>

                    {isAuthenticated && userVehicles.length > 0 && (
                      <div className="d-flex gap-3 mb-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="vehicleOption"
                            id="vehExisting"
                            checked={vehicleChoice === 'existing'}
                            onChange={() => setVehicleChoice('existing')}
                          />
                          <label className="form-check-label fw-semibold" htmlFor="vehExisting">
                            Choose from My Registered Vehicles ({userVehicles.length})
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="vehicleOption"
                            id="vehNew"
                            checked={vehicleChoice === 'new'}
                            onChange={() => setVehicleChoice('new')}
                          />
                          <label className="form-check-label fw-semibold" htmlFor="vehNew">
                            Add a New Car
                          </label>
                        </div>
                      </div>
                    )}

                    {vehicleChoice === 'existing' && userVehicles.length > 0 ? (
                      <select
                        className="form-select form-select-lg"
                        value={selectedVehicleId}
                        onChange={(e) => setSelectedVehicleId(e.target.value)}
                      >
                        {userVehicles.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.year} {v.make} {v.model} - Plate: {v.licensePlate} ({v.fuelType})
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="bg-light p-3 rounded-3 border">
                        <div className="row g-3">
                          <div className="col-md-4">
                            <label className="form-label small fw-semibold">Car Make *</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="e.g. Toyota, Honda, Ford"
                              value={newVehicle.make}
                              onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
                              required={vehicleChoice === 'new'}
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label small fw-semibold">Model *</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="e.g. Camry, Civic, F-150"
                              value={newVehicle.model}
                              onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                              required={vehicleChoice === 'new'}
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label small fw-semibold">Model Year *</label>
                            <input
                              type="number"
                              className="form-control"
                              min="1990"
                              max={new Date().getFullYear() + 1}
                              value={newVehicle.year}
                              onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                              required={vehicleChoice === 'new'}
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label small fw-semibold">License Plate *</label>
                            <input
                              type="text"
                              className="form-control text-uppercase"
                              placeholder="e.g. TX-401-KLR"
                              value={newVehicle.licensePlate}
                              onChange={(e) => setNewVehicle({ ...newVehicle, licensePlate: e.target.value })}
                              required={vehicleChoice === 'new'}
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label small fw-semibold">Fuel Type</label>
                            <select
                              className="form-select"
                              value={newVehicle.fuelType}
                              onChange={(e) => setNewVehicle({ ...newVehicle, fuelType: e.target.value })}
                            >
                              <option value="Gasoline">Gasoline</option>
                              <option value="Diesel">Diesel</option>
                              <option value="Hybrid">Hybrid</option>
                              <option value="Electric">Electric (EV)</option>
                            </select>
                          </div>
                          <div className="col-md-4">
                            <label className="form-label small fw-semibold">Current Mileage</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="e.g. 35000"
                              value={newVehicle.mileage}
                              onChange={(e) => setNewVehicle({ ...newVehicle, mileage: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step 3: Preferred Date & Time */}
                  <div className="mb-4">
                    <label className="form-label fw-bold text-dark d-flex align-items-center gap-2">
                      <span className="badge bg-primary rounded-circle">3</span>
                      Preferred Date & Time Slot
                    </label>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label small text-secondary">Appointment Date</label>
                        <input
                          type="date"
                          className="form-control form-control-lg"
                          value={date}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setDate(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small text-secondary">Time Slot</label>
                        <select
                          className="form-select form-select-lg"
                          value={timeSlot}
                          onChange={(e) => setTimeSlot(e.target.value)}
                        >
                          {TIME_SLOTS.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Notes and Contact */}
                  <div className="mb-4">
                    <label className="form-label fw-bold text-dark d-flex align-items-center gap-2">
                      <span className="badge bg-primary rounded-circle">4</span>
                      Specific Problem / Service Remarks
                    </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Describe any specific symptoms (e.g. squeaking brakes, check engine light on, vibrating steering, AC not cooling)..."
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                    ></textarea>
                  </div>

                  {/* Contact Number */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold text-dark">Contact Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="+1 (555) 000-0000"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                    />
                    <div className="form-text">We will send SMS updates when your vehicle enters the bay.</div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3 border-top d-flex justify-content-between align-items-center">
                    <div>
                      <span className="text-secondary small d-block">Estimated Price</span>
                      <span className="fs-3 fw-bold text-primary">
                        ${selectedServiceObj ? Number(selectedServiceObj.price).toFixed(2) : '0.00'}
                      </span>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg px-4 py-2 fw-bold rounded-3 shadow">
                      <i className="bi bi-calendar-check-fill me-2"></i> Confirm Booking
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar Summary Column */}
            <div className="col-lg-4">
              <div className="card carcare-card border-0 p-4 sticky-top" style={{ top: '100px' }}>
                <h5 className="fw-bold mb-3 text-dark">Booking Overview</h5>

                {selectedServiceObj && (
                  <div className="mb-3">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="badge bg-primary-subtle text-primary">{selectedServiceObj.category}</span>
                      <span className="small text-secondary">• {selectedServiceObj.duration}</span>
                    </div>
                    <h6 className="fw-bold text-dark mb-1">{selectedServiceObj.name}</h6>
                    <p className="text-secondary small mb-3">{selectedServiceObj.shortDescription}</p>

                    <h6 className="small fw-bold text-dark mb-2">Included In This Service:</h6>
                    <ul className="list-unstyled mb-0 d-flex flex-column gap-1">
                      {selectedServiceObj.features?.map((f, i) => (
                        <li key={i} className="small text-secondary d-flex align-items-baseline gap-2">
                          <i className="bi bi-check2 text-success"></i>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="border-top pt-3 mt-3">
                  <div className="d-flex justify-content-between mb-2 small">
                    <span className="text-secondary">Base Service Fee</span>
                    <span className="fw-semibold text-dark">
                      ${selectedServiceObj ? Number(selectedServiceObj.price).toFixed(2) : '0.00'}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2 small">
                    <span className="text-secondary">Shop Supplies & Disposal</span>
                    <span className="text-success fw-semibold">Waived (Promo)</span>
                  </div>
                  <div className="d-flex justify-content-between border-top pt-2">
                    <span className="fw-bold text-dark">Total Estimated</span>
                    <span className="fw-bold fs-5 text-primary">
                      ${selectedServiceObj ? Number(selectedServiceObj.price).toFixed(2) : '0.00'}
                    </span>
                  </div>
                </div>

                <div className="alert alert-info mt-4 mb-0 small rounded-3 p-3">
                  <i className="bi bi-shield-check me-2 fs-5 align-middle"></i>
                  <strong>100% Free Cancellation:</strong> You can reschedule or cancel up to 2 hours before your slot.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookServices;

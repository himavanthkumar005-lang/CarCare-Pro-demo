import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero-section py-5 py-lg-6 position-relative">
      <div className="container py-4 position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center g-5">
          {/* Hero Left Column */}
          <div className="col-lg-7 text-center text-lg-start">
            <div className="hero-badge mb-3">
              <i className="bi bi-patch-check-fill text-danger"></i>
              <span>#1 Rated Auto Care & Repair Facility</span>
            </div>

            <h1 className="display-4 fw-extrabold text-white mb-3" style={{ lineHeight: 1.15 }}>
              Expert Automobile Care, <br />
              <span className="text-danger">Engineered For Perfection</span>
            </h1>

            <p className="lead text-light opacity-75 mb-4" style={{ maxWidth: '580px' }}>
              From computerized diagnostics and periodic maintenance to major mechanical repairs,
              our certified master technicians keep your vehicle running smooth, safe, and reliable.
            </p>

            {/* CTA Buttons */}
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start mb-5">
              <Link to="/book-service" className="btn btn-primary btn-lg px-4 py-3 fw-bold rounded-3 shadow-lg d-flex align-items-center justify-content-center gap-2">
                <i className="bi bi-calendar-check-fill"></i>
                <span>Book a Service Now</span>
              </Link>
              <Link to="/services" className="btn btn-outline-light btn-lg px-4 py-3 fw-semibold rounded-3 d-flex align-items-center justify-content-center gap-2">
                <i className="bi bi-wrench-adjustable"></i>
                <span>Explore Packages</span>
              </Link>
            </div>

            {/* Value Props Bar */}
            <div className="row g-3 pt-3 border-top border-secondary border-opacity-25 text-start">
              <div className="col-sm-4">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-shield-fill-check text-danger fs-4"></i>
                  <div>
                    <div className="text-white fw-bold small">100% OEM Parts</div>
                    <small className="text-secondary" style={{ fontSize: '0.75rem' }}>12-Month Guarantee</small>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-stopwatch-fill text-white fs-4"></i>
                  <div>
                    <div className="text-white fw-bold small">Fast Turnaround</div>
                    <small className="text-secondary" style={{ fontSize: '0.75rem' }}>Express Bay Available</small>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-currency-dollar text-danger fs-4"></i>
                  <div>
                    <div className="text-white fw-bold small">Clear Estimates</div>
                    <small className="text-secondary" style={{ fontSize: '0.75rem' }}>No Hidden Surprises</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Column: Interactive Quick Card */}
          <div className="col-lg-5">
            <div className="card bg-black border border-danger border-opacity-50 text-white shadow-2xl p-4 rounded-4 position-relative">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="badge bg-danger text-white px-3 py-2 rounded-pill fw-bold">
                  <i className="bi bi-lightning-charge-fill me-1"></i> Quick Service Center
                </span>
                <span className="text-white small fw-semibold d-flex align-items-center gap-1">
                  <span className="spinner-grow spinner-grow-sm text-danger" role="status"></span>
                  Open Today: 8:00 AM - 7:00 PM
                </span>
              </div>

              <h4 className="fw-bold mb-2 text-white">Need Urgent Assistance?</h4>
              <p className="text-secondary small mb-4">
                Choose your required maintenance or repair service below and get a verified slot in under 2 minutes.
              </p>

              <div className="list-group list-group-flush mb-4 rounded-3 overflow-hidden">
                <Link to="/book-service" className="list-group-item list-group-item-action bg-dark text-white border-secondary border-opacity-25 d-flex justify-content-between align-items-center p-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-danger bg-opacity-25 text-danger p-2 rounded-3">
                      <i className="bi bi-wrench-adjustable fs-5"></i>
                    </div>
                    <div>
                      <div className="fw-bold text-white">Periodic Maintenance</div>
                      <small className="text-secondary">40-point full checkup & oil change</small>
                    </div>
                  </div>
                  <span className="text-danger fw-bold">$149.99</span>
                </Link>

                <Link to="/book-service" className="list-group-item list-group-item-action bg-dark text-white border-secondary border-opacity-25 d-flex justify-content-between align-items-center p-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-danger bg-opacity-25 text-danger p-2 rounded-3">
                      <i className="bi bi-shield-check fs-5"></i>
                    </div>
                    <div>
                      <div className="fw-bold text-white">Brake System Repair</div>
                      <small className="text-secondary">Ceramic pads & line inspection</small>
                    </div>
                  </div>
                  <span className="text-danger fw-bold">$189.00</span>
                </Link>

                <Link to="/book-service" className="list-group-item list-group-item-action bg-dark text-white border-secondary border-opacity-25 d-flex justify-content-between align-items-center p-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-danger bg-opacity-25 text-danger p-2 rounded-3">
                      <i className="bi bi-cpu fs-5"></i>
                    </div>
                    <div>
                      <div className="fw-bold text-white">Computer Diagnostics</div>
                      <small className="text-secondary">Full OBD-II sensor scanning</small>
                    </div>
                  </div>
                  <span className="text-danger fw-bold">$89.50</span>
                </Link>
              </div>

              <Link to="/book-service" className="btn btn-danger w-100 py-2 fw-bold text-white rounded-3 d-flex align-items-center justify-content-center gap-2">
                <span>Reserve Appointment Slot</span>
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

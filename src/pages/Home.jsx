import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import { useData } from '../context/DataContext';

const Home = () => {
  const { services } = useData();
  const featuredServices = services.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Quick Stats Bar */}
      <section className="py-4 bg-white border-bottom shadow-sm">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-6 col-md-3">
              <div className="fs-2 fw-extrabold text-danger mb-0">15,000+</div>
              <small className="text-secondary fw-semibold">Cars Serviced</small>
            </div>
            <div className="col-6 col-md-3">
              <div className="fs-2 fw-extrabold text-dark mb-0">99.4%</div>
              <small className="text-secondary fw-semibold">Client Satisfaction</small>
            </div>
            <div className="col-6 col-md-3">
              <div className="fs-2 fw-extrabold text-danger mb-0">35+</div>
              <small className="text-secondary fw-semibold">Certified Master Mechanics</small>
            </div>
            <div className="col-6 col-md-3">
              <div className="fs-2 fw-extrabold text-dark mb-0">12 Months</div>
              <small className="text-secondary fw-semibold">Service & Parts Guarantee</small>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-5 py-lg-6">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5">
            <div>
              <span className="text-danger fw-bold text-uppercase small">Professional Auto Maintenance</span>
              <h2 className="display-6 fw-bold text-dark mb-2">Our Popular Services</h2>
              <p className="text-secondary mb-0">Engineered with high standards, state-of-the-art tools, and OEM replacement components.</p>
            </div>
            <div className="mt-3 mt-md-0">
              <Link to="/services" className="btn btn-outline-danger px-4 py-2 rounded-3 fw-semibold d-inline-flex align-items-center gap-2">
                <span>View Full Catalog</span>
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>

          <div className="row g-4">
            {featuredServices.map((service) => (
              <div key={service.id} className="col-md-6 col-lg-3">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-5 bg-white border-top border-bottom">
        <div className="container">
          <div className="text-center max-w-700 mx-auto mb-5">
            <span className="text-danger fw-bold text-uppercase small">The CarCare-Pro Advantage</span>
            <h2 className="display-6 fw-bold text-dark mb-3">Why Trust Our Auto Mobile Center?</h2>
            <p className="text-secondary">
              We combine years of automotive expertise, dealership-level computer diagnostic suites, and customer-first transparency.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card carcare-card h-100 p-4 border-0 text-center">
                <div className="service-icon-box bg-danger bg-opacity-10 text-danger mx-auto mb-3">
                  <i className="bi bi-cpu-fill fs-3"></i>
                </div>
                <h5 className="fw-bold mb-2">Laser & OBD-II Diagnostics</h5>
                <p className="text-secondary small mb-0">
                  Precision digital scanning of engine, transmission, brakes, and electrical subsystems for rapid fault isolation.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card carcare-card h-100 p-4 border-0 text-center">
                <div className="service-icon-box bg-danger bg-opacity-10 text-danger mx-auto mb-3">
                  <i className="bi bi-person-badge-fill fs-3"></i>
                </div>
                <h5 className="fw-bold mb-2">ASE Certified Mechanics</h5>
                <p className="text-secondary small mb-0">
                  Hands-on certified technicians trained on hybrid, electric, domestic, and imported European automobile platforms.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card carcare-card h-100 p-4 border-0 text-center">
                <div className="service-icon-box bg-danger bg-opacity-10 text-danger mx-auto mb-3">
                  <i className="bi bi-cash-stack fs-3"></i>
                </div>
                <h5 className="fw-bold mb-2">Zero Hidden Fees</h5>
                <p className="text-secondary small mb-0">
                  Upfront quotes before work starts. Digital invoices and live status updates so you remain in complete control.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card carcare-card h-100 p-4 border-0 text-center">
                <div className="service-icon-box bg-danger bg-opacity-10 text-danger mx-auto mb-3">
                  <i className="bi bi-shield-lock-fill fs-3"></i>
                </div>
                <h5 className="fw-bold mb-2">Genuine OEM Spares</h5>
                <p className="text-secondary small mb-0">
                  We use manufacturer-approved synthetic fluids, OEM oil filters, and high-performance certified replacement parts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - 3 Step Process */}
      <section className="py-5 py-lg-6">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-danger fw-bold text-uppercase small">Simple & Transparent Booking</span>
            <h2 className="display-6 fw-bold text-dark mb-3">How CarCare-Pro Works</h2>
            <p className="text-secondary">Book your car service in under 2 minutes directly from your phone or computer.</p>
          </div>

          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="bg-white p-4 rounded-4 shadow-sm h-100 border">
                <div className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 fw-bold fs-4" style={{ width: 60, height: 60 }}>
                  1
                </div>
                <h5 className="fw-bold mb-2">Select Your Vehicle & Service</h5>
                <p className="text-secondary small mb-0">
                  Choose from your saved garage or enter your car details, then select the required maintenance or repair package.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="bg-white p-4 rounded-4 shadow-sm h-100 border">
                <div className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 fw-bold fs-4" style={{ width: 60, height: 60 }}>
                  2
                </div>
                <h5 className="fw-bold mb-2">Pick Date & Time Slot</h5>
                <p className="text-secondary small mb-0">
                  Choose an appointment slot that fits your schedule. Drop off your car or use our local pickup option.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="bg-white p-4 rounded-4 shadow-sm h-100 border">
                <div className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 fw-bold fs-4" style={{ width: 60, height: 60 }}>
                  3
                </div>
                <h5 className="fw-bold mb-2">Real-Time Track & Drive Safe</h5>
                <p className="text-secondary small mb-0">
                  Receive live updates in your Service History portal as your mechanic finishes testing and certifies your vehicle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-5 bg-black text-white border-top border-danger border-opacity-25">
        <div className="container text-center py-4">
          <div className="max-w-700 mx-auto">
            <h2 className="display-6 fw-bold mb-3">Ready to Keep Your Vehicle at Peak Performance?</h2>
            <p className="lead text-light opacity-75 mb-4">
              Schedule your appointment today and experience dealership-quality service without the dealership markup.
            </p>
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <Link to="/book-service" className="btn btn-danger btn-lg px-5 py-3 fw-bold rounded-3">
                <i className="bi bi-calendar-check me-2"></i> Book an Appointment
              </Link>
              <Link to="/services" className="btn btn-outline-light btn-lg px-5 py-3 fw-semibold rounded-3">
                <i className="bi bi-card-checklist me-2"></i> View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

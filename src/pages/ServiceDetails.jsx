import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const ServiceDetails = () => {
  const { id } = useParams();
  const { services } = useData();

  const service = services.find((s) => s.id === id) || services[0];

  if (!service) {
    return (
      <div className="container py-5 text-center">
        <h4>Service Not Found</h4>
        <Link to="/services" className="btn btn-primary mt-3">Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="py-5">
      <div className="container">
        <Link to="/services" className="text-secondary text-decoration-none small d-inline-flex align-items-center gap-1 mb-4">
          <i className="bi bi-arrow-left"></i> Back to Services Catalog
        </Link>

        <div className="row g-5">
          <div className="col-lg-8">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-1 rounded-pill">
                {service.category}
              </span>
              {service.badge && (
                <span className="badge bg-warning text-dark fw-bold px-3 py-1 rounded-pill">
                  {service.badge}
                </span>
              )}
            </div>

            <h1 className="display-6 fw-bold text-dark mb-3">{service.name}</h1>
            <p className="lead text-secondary mb-4">{service.shortDescription}</p>

            <div className="card carcare-card border-0 p-4 mb-4 shadow-sm">
              <h5 className="fw-bold mb-3">Service Scope & Inclusions</h5>
              <div className="row g-3">
                {service.features?.map((feature, i) => (
                  <div key={i} className="col-md-6">
                    <div className="d-flex align-items-start gap-2">
                      <i className="bi bi-check-circle-fill text-success fs-5"></i>
                      <span className="text-dark small">{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card carcare-card border-0 p-4 shadow-sm">
              <h5 className="fw-bold mb-3">Why Perform This Service at CarCare-Pro?</h5>
              <p className="text-secondary small mb-3">
                Our technicians are ASE-certified and equipped with computerized laser alignment racks, digital fluid extractors, and factory-authorized OBD-II scanner suites. We exclusively utilize OEM fluids and manufacturer-approved components to preserve your automobile's warranty.
              </p>
              <div className="row g-3">
                <div className="col-sm-4">
                  <div className="p-3 bg-light rounded-3 text-center">
                    <i className="bi bi-shield-check text-primary fs-3 d-block mb-1"></i>
                    <strong className="small d-block text-dark">12-Mo Warranty</strong>
                    <span className="text-secondary" style={{ fontSize: '0.75rem' }}>Parts & Labor</span>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="p-3 bg-light rounded-3 text-center">
                    <i className="bi bi-clock-history text-primary fs-3 d-block mb-1"></i>
                    <strong className="small d-block text-dark">Rapid Turnaround</strong>
                    <span className="text-secondary" style={{ fontSize: '0.75rem' }}>{service.duration}</span>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="p-3 bg-light rounded-3 text-center">
                    <i className="bi bi-person-check text-primary fs-3 d-block mb-1"></i>
                    <strong className="small d-block text-dark">Master Mechanics</strong>
                    <span className="text-secondary" style={{ fontSize: '0.75rem' }}>Certified Technicians</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card carcare-card border-0 p-4 sticky-top shadow-sm" style={{ top: '100px' }}>
              <h4 className="fw-bold text-dark mb-1">Package Pricing</h4>
              <div className="display-6 fw-bold text-primary mb-3">
                ${Number(service.price).toFixed(2)}
              </div>

              <div className="d-flex justify-content-between py-2 border-top text-secondary small">
                <span>Estimated Duration</span>
                <span className="fw-semibold text-dark">{service.duration}</span>
              </div>
              <div className="d-flex justify-content-between py-2 border-top text-secondary small">
                <span>Inspection Report</span>
                <span className="fw-semibold text-success">Included (Complimentary)</span>
              </div>
              <div className="d-flex justify-content-between py-2 border-top border-bottom text-secondary small mb-4">
                <span>Warranty</span>
                <span className="fw-semibold text-dark">12,000 miles / 1 Year</span>
              </div>

              <Link
                to={`/book-service?serviceId=${service.id}`}
                className="btn btn-primary w-100 py-3 fw-bold rounded-3 mb-2 shadow"
              >
                <i className="bi bi-calendar-check me-2"></i> Book This Service
              </Link>
              <Link to="/services" className="btn btn-outline-secondary w-100 py-2 rounded-3 small">
                Browse All Packages
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;

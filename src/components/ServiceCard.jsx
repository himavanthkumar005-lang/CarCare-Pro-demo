import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  return (
    <div className="card carcare-card h-100 border-0 p-3 p-lg-4">
      <div className="card-body d-flex flex-column p-0">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="service-icon-box bg-primary bg-opacity-10 text-primary">
            <i className={`bi ${service.icon || 'bi-wrench'} fs-4`}></i>
          </div>
          {service.badge && (
            <span className="badge bg-primary-subtle text-primary fw-bold px-2 py-1 rounded-pill">
              {service.badge}
            </span>
          )}
        </div>

        <h5 className="card-title fw-bold text-dark mb-1">{service.name}</h5>
        <div className="text-secondary small mb-3 d-flex align-items-center gap-2">
          <span><i className="bi bi-tag me-1"></i>{service.category}</span>
          <span>•</span>
          <span><i className="bi bi-clock me-1"></i>{service.duration}</span>
        </div>

        <p className="card-text text-muted small flex-grow-1 mb-4" style={{ minHeight: '44px' }}>
          {service.shortDescription}
        </p>

        {service.features && service.features.length > 0 && (
          <div className="mb-4">
            <h6 className="text-dark fw-semibold small mb-2">Package Inclusions:</h6>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-1">
              {service.features.slice(0, 4).map((feature, idx) => (
                <li key={idx} className="small text-secondary d-flex align-items-baseline gap-2">
                  <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '0.8rem' }}></i>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="d-flex align-items-center justify-content-between pt-3 border-top mt-auto">
          <div>
            <span className="text-secondary small d-block">Starting from</span>
            <span className="fs-4 fw-bold text-primary">${Number(service.price).toFixed(2)}</span>
          </div>

          <Link
            to={`/book-service?serviceId=${service.id}`}
            className="btn btn-primary btn-sm px-3 py-2 fw-semibold rounded-3 d-flex align-items-center gap-1"
          >
            <span>Book Now</span>
            <i className="bi bi-chevron-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

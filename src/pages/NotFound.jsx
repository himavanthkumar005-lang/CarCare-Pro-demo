import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="py-5 text-center my-auto">
      <div className="container py-5">
        <div className="display-1 fw-extrabold text-primary mb-2">404</div>
        <h2 className="fw-bold text-dark mb-3">Page Off Course</h2>
        <p className="text-secondary mb-4 max-w-700 mx-auto">
          The automotive service page or destination you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary px-4 py-2 rounded-3 fw-semibold">
          <i className="bi bi-house me-2"></i> Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

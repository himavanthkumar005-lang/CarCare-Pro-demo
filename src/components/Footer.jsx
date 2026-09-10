import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Footer = () => {
  const { isAdmin } = useAuth();

  if (isAdmin) {
    return (
      <footer className="footer-carcare py-3 mt-auto border-top border-secondary border-opacity-25 text-center small text-secondary">
        <div className="container">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-danger text-white">ADMIN DESK</span>
              <span className="text-light fw-semibold">CarCare-Pro Workshop Management System</span>
            </div>
            <p className="mb-0">
              &copy; {new Date().getFullYear()} CarCare-Pro Auto Mobile Center. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer-carcare pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Brand Info */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="bg-danger text-white rounded-3 p-2 d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}>
                <i className="bi bi-car-front-fill fs-5"></i>
              </div>
              <span className="fs-4 fw-bold text-white">CarCare-Pro</span>
            </div>
            <p className="small text-secondary mb-3">
              Premier automotive service and maintenance center. Equipped with state-of-the-art diagnostic machinery, certified technicians, and genuine OEM components to keep your automobile running at factory performance.
            </p>
            <div className="d-flex gap-2">
              <span className="badge bg-secondary-subtle text-light p-2"><i className="bi bi-shield-check me-1"></i> Certified ASE Center</span>
              <span className="badge bg-secondary-subtle text-light p-2"><i className="bi bi-clock me-1"></i> 24/7 Roadside Assistance</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="col-lg-2 col-md-6">
            <h6>Quick Links</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link to="/">Home Overview</Link></li>
              <li><Link to="/services">Services Catalog</Link></li>
              <li><Link to="/book-service">Book an Appointment</Link></li>
              <li><Link to="/vehicles">Registered Vehicles</Link></li>
              <li><Link to="/service-history">Service Logs & History</Link></li>
            </ul>
          </div>

          {/* Service Hours */}
          <div className="col-lg-3 col-md-6">
            <h6>Center Working Hours</h6>
            <ul className="list-unstyled text-secondary small d-flex flex-column gap-2">
              <li className="d-flex justify-content-between">
                <span>Monday - Friday:</span>
                <span className="text-light fw-medium">8:00 AM - 7:00 PM</span>
              </li>
              <li className="d-flex justify-content-between">
                <span>Saturday:</span>
                <span className="text-light fw-medium">9:00 AM - 5:00 PM</span>
              </li>
              <li className="d-flex justify-content-between">
                <span>Sunday:</span>
                <span className="text-danger fw-semibold">Emergency Towing Only</span>
              </li>
              <li className="pt-2 border-top border-secondary border-opacity-25 mt-1">
                <i className="bi bi-telephone-inbound text-danger me-2"></i>
                <span className="text-light fw-bold">Emergency Hotline: (800) 227-2273</span>
              </li>
            </ul>
          </div>

          {/* Location & Support */}
          <div className="col-lg-3 col-md-6">
            <h6>Service Hub Location</h6>
            <div className="small text-secondary d-flex flex-column gap-2">
              <div className="d-flex gap-2">
                <i className="bi bi-geo-alt text-danger mt-1"></i>
                <span>400 Motorway Parkway, Suite 10, Austin, TX 78701</span>
              </div>
              <div className="d-flex gap-2">
                <i className="bi bi-envelope text-danger mt-1"></i>
                <span>service@carcarepro.com</span>
              </div>
              <div className="d-flex gap-2">
                <i className="bi bi-headset text-danger mt-1"></i>
                <span>Direct Desk: +1 (555) 727-2273</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-top border-secondary border-opacity-25 pt-3 mt-4 text-center small text-secondary">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} CarCare-Pro Auto Mobile Center. All rights reserved. Powered by React.js & Redux.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

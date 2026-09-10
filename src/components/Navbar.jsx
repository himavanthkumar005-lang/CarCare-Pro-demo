import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-carcare sticky-top">
      <div className="container">
        {/* Brand Logo & Name */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to={isAdmin ? "/admin" : "/"}>
          <div className="bg-danger text-white rounded-3 p-2 d-flex align-items-center justify-content-center shadow-sm" style={{ width: 40, height: 40 }}>
            <i className={isAdmin ? "bi bi-shield-lock-fill fs-5 text-white" : "bi bi-car-front-fill fs-5 text-white"}></i>
          </div>
          <div className="d-flex flex-column lh-1">
            <div className="d-flex align-items-center gap-2">
              <span className="navbar-brand-logo fs-4">CarCare-Pro</span>
              {isAdmin && (
                <span className="badge bg-danger text-white fw-bold" style={{ fontSize: '0.62rem', letterSpacing: '0.5px' }}>
                  ADMIN
                </span>
              )}
            </div>
            <small className="text-secondary fw-semibold" style={{ fontSize: '0.68rem', letterSpacing: '1px' }}>
              {isAdmin ? 'WORKSHOP CONTROL CENTER' : 'AUTO MOBILE CENTER'}
            </small>
          </div>
        </Link>

        {/* Mobile Action Area: Theme Toggle & Menu Toggler */}
        <div className="d-flex align-items-center gap-2 d-lg-none">
          <ThemeToggle />
          <button
            className="navbar-toggler border-0 shadow-none p-1"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#carCareNav"
            aria-controls="carCareNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* Navbar Links & Profile */}
        <div className="collapse navbar-collapse" id="carCareNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-3 gap-1">
            {isAdmin ? (
              /* Admin Navigation Only - All user navigations removed */
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link fw-bold ${isActive ? 'active text-warning' : 'text-light'}`
                  }
                  to="/admin"
                >
                  <i className="bi bi-speedometer2 me-1 text-warning"></i> Admin Panel
                </NavLink>
              </li>
            ) : (
              /* User Navigation Only - Admin Panel removed */
              <>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/">
                    <i className="bi bi-house-door me-1"></i> Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/services">
                    <i className="bi bi-tools me-1"></i> Services
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/book-service">
                    <i className="bi bi-calendar-check me-1"></i> Book a Service
                  </NavLink>
                </li>

                {/* Customer specific links (only for logged in customers) */}
                {isAuthenticated && (
                  <>
                    <li className="nav-item">
                      <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/vehicles">
                        <i className="bi bi-car-front me-1"></i> My Vehicles
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/service-history">
                        <i className="bi bi-clock-history me-1"></i> Service History
                      </NavLink>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>

          {/* Right Action buttons / User profile */}
          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            {/* Desktop Theme Switcher */}
            <div className="d-none d-lg-block">
              <ThemeToggle />
            </div>

            {isAuthenticated ? (
              <div className="d-flex align-items-center gap-3">
                <Link
                  to="/profile"
                  className="d-flex align-items-center gap-2 text-white text-decoration-none"
                  title="View user profile & preferences"
                >
                  <div className="bg-dark border border-secondary rounded-circle d-flex align-items-center justify-content-center overflow-hidden" style={{ width: 36, height: 36 }}>
                    {currentUser.avatar ? (
                      <img src={currentUser.avatar} alt={currentUser.name} className="w-100 h-100 object-fit-cover" />
                    ) : (
                      <i className="bi bi-person-fill text-secondary"></i>
                    )}
                  </div>
                  <div className="d-none d-sm-block text-start lh-sm">
                    <div className="fw-semibold text-white small">{currentUser.name}</div>
                    <span className={`badge ${isAdmin ? 'bg-danger text-white' : 'bg-primary text-white'}`} style={{ fontSize: '0.65rem' }}>
                      {isAdmin ? 'ADMINISTRATOR' : 'CUSTOMER'}
                    </span>
                  </div>
                </Link>

                <button onClick={handleLogout} className="btn btn-outline-danger btn-sm px-3 d-flex align-items-center gap-1 rounded-3">
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link to="/login" className="btn btn-outline-light btn-sm px-3 rounded-3">
                  <i className="bi bi-person me-1"></i> Sign In
                </Link>
                <Link to="/register" className="btn btn-danger btn-sm px-3 rounded-3">
                  <i className="bi bi-person-plus me-1"></i> Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

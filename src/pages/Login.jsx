import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [activeTab, setActiveTab] = useState('user'); // 'user' or 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || (activeTab === 'admin' ? '/admin' : '/');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = login(email, password, activeTab);
    setLoading(false);

    if (result.success) {
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(from === '/admin' ? '/' : from);
      }
    } else {
      setError(result.message);
    }
  };

  // Demo auto-fill helpers
  const fillDemoAdmin = () => {
    setActiveTab('admin');
    setEmail('admin@carcarepro.com');
    setPassword('admin');
    setError('');
  };

  const fillDemoUser = () => {
    setActiveTab('user');
    setEmail('user@example.com');
    setPassword('user');
    setError('');
  };

  return (
    <div className="py-5 bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-5">
            {/* Brand Logo Header */}
            <div className="text-center mb-4">
              <Link to="/" className="d-inline-flex align-items-center gap-2 text-decoration-none mb-2">
                <div className="bg-primary text-white rounded-3 p-2 d-flex align-items-center justify-content-center" style={{ width: 44, height: 44 }}>
                  <i className="bi bi-car-front-fill fs-4"></i>
                </div>
                <span className="fs-3 fw-extrabold text-dark">CarCare-Pro</span>
              </Link>
              <p className="text-secondary small">Sign in to your automobile service portal</p>
            </div>

            <div className="card carcare-card border-0 shadow-lg p-4 p-sm-5">
              {/* Role Switcher Tabs */}
              <div className="d-flex p-1 bg-light rounded-3 mb-4 border">
                <button
                  type="button"
                  className={`btn w-50 py-2 fw-semibold rounded-2 transition ${
                    activeTab === 'user' ? 'btn-white bg-white text-primary shadow-sm' : 'text-secondary'
                  }`}
                  onClick={() => {
                    setActiveTab('user');
                    setError('');
                  }}
                >
                  <i className="bi bi-person me-1"></i> Customer Login
                </button>
                <button
                  type="button"
                  className={`btn w-50 py-2 fw-semibold rounded-2 transition ${
                    activeTab === 'admin' ? 'btn-white bg-white text-danger shadow-sm' : 'text-secondary'
                  }`}
                  onClick={() => {
                    setActiveTab('admin');
                    setError('');
                  }}
                >
                  <i className="bi bi-shield-lock me-1"></i> Admin Portal
                </button>
              </div>

              {/* Demo Credentials Helper Pill */}
              <div className="bg-light p-3 rounded-3 mb-4 border border-dashed">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="small fw-bold text-dark">
                    <i className="bi bi-key-fill text-warning me-1"></i> 1-Click Demo Logins:
                  </span>
                </div>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    onClick={fillDemoUser}
                    className="btn btn-outline-primary btn-sm flex-fill py-1 fw-semibold"
                  >
                    Demo Customer
                  </button>
                  <button
                    type="button"
                    onClick={fillDemoAdmin}
                    className="btn btn-outline-danger btn-sm flex-fill py-1 fw-semibold"
                  >
                    Demo Admin
                  </button>
                </div>
              </div>

              {error && (
                <div className="alert alert-danger py-2 small mb-4 rounded-3 d-flex align-items-center gap-2">
                  <i className="bi bi-exclamation-octagon-fill"></i>
                  <span>{error}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-dark">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-secondary border-end-0">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control border-start-0 ps-0 shadow-none"
                      placeholder={activeTab === 'admin' ? 'admin@carcarepro.com' : 'user@example.com'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-semibold text-dark">Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-secondary border-end-0">
                      <i className="bi bi-lock"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control border-start-0 ps-0 shadow-none"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`btn w-100 py-2 fw-bold rounded-3 ${
                    activeTab === 'admin' ? 'btn-danger' : 'btn-primary'
                  }`}
                >
                  {loading ? 'Authenticating...' : `Sign In as ${activeTab === 'admin' ? 'Administrator' : 'Customer'}`}
                </button>
              </form>

              <div className="text-center mt-4 pt-3 border-top small text-secondary">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary fw-semibold text-decoration-none">
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

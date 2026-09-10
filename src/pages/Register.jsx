import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user'); // 'user' or 'admin'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }

    setLoading(true);
    const result = register({
      name,
      email,
      password,
      role,
      phone,
      address
    });
    setLoading(false);

    if (result.success) {
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="py-5 bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-6">
            <div className="text-center mb-4">
              <Link to="/" className="d-inline-flex align-items-center gap-2 text-decoration-none mb-2">
                <div className="bg-primary text-white rounded-3 p-2 d-flex align-items-center justify-content-center" style={{ width: 44, height: 44 }}>
                  <i className="bi bi-car-front-fill fs-4"></i>
                </div>
                <span className="fs-3 fw-extrabold text-dark">CarCare-Pro</span>
              </Link>
              <p className="text-secondary small">Create an account to manage your vehicle services</p>
            </div>

            <div className="card carcare-card border-0 shadow-lg p-4 p-sm-5">
              <h4 className="fw-bold text-dark mb-3">Create New Account</h4>

              {error && (
                <div className="alert alert-danger py-2 small mb-4 rounded-3 d-flex align-items-center gap-2">
                  <i className="bi bi-exclamation-octagon-fill"></i>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-dark">Account Type</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="accountRole"
                        id="roleUser"
                        value="user"
                        checked={role === 'user'}
                        onChange={() => setRole('user')}
                      />
                      <label className="form-check-label fw-semibold" htmlFor="roleUser">
                        Customer Account
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="accountRole"
                        id="roleAdmin"
                        value="admin"
                        checked={role === 'admin'}
                        onChange={() => setRole('admin')}
                      />
                      <label className="form-check-label fw-semibold text-danger" htmlFor="roleAdmin">
                        Service Center Admin
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-sm-6">
                    <label className="form-label small fw-semibold text-dark">Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. John Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label small fw-semibold text-dark">Email Address *</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-sm-6">
                    <label className="form-label small fw-semibold text-dark">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label small fw-semibold text-dark">City / Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Austin, TX"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-sm-6">
                    <label className="form-label small fw-semibold text-dark">Password *</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label small fw-semibold text-dark">Confirm Password *</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`btn w-100 py-2 fw-bold rounded-3 ${
                    role === 'admin' ? 'btn-danger' : 'btn-primary'
                  }`}
                >
                  {loading ? 'Creating Account...' : `Register as ${role === 'admin' ? 'Administrator' : 'Customer'}`}
                </button>
              </form>

              <div className="text-center mt-4 pt-3 border-top small text-secondary">
                Already registered?{' '}
                <Link to="/login" className="text-primary fw-semibold text-decoration-none">
                  Sign in here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

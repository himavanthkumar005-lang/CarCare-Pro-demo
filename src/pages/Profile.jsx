import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Profile = () => {
  const { currentUser, updateProfile, isAdmin } = useAuth();
  const { themeMode, setTheme } = useTheme();

  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({ name, phone, address });
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="py-5">
      <div className="container max-w-700">
        <h2 className="fw-bold text-dark mb-1">User Account Profile</h2>
        <p className="text-secondary mb-4">View and update your personal information and contact preferences.</p>

        <div className="card carcare-card border-0 p-4 p-md-5 shadow-sm">
          {message && <div className="alert alert-success py-2 small mb-4">{message}</div>}

          <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
            <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center overflow-hidden" style={{ width: 64, height: 64 }}>
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt="" className="w-100 h-100 object-fit-cover" />
              ) : (
                <i className="bi bi-person fs-1"></i>
              )}
            </div>
            <div>
              <h5 className="fw-bold text-dark mb-0">{currentUser?.name}</h5>
              <div className="text-secondary small">{currentUser?.email}</div>
              <span className={`badge mt-1 ${isAdmin ? 'bg-danger' : 'bg-primary'}`}>
                {isAdmin ? 'ADMINISTRATOR' : 'CUSTOMER'}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-semibold">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">Email Address (Read-only)</label>
              <input
                type="email"
                className="form-control bg-light"
                value={currentUser?.email || ''}
                readOnly
              />
            </div>

            <div className="row g-3 mb-4">
              <div className="col-sm-6">
                <label className="form-label small fw-semibold">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="col-sm-6">
                <label className="form-label small fw-semibold">Street / City Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary px-4 fw-semibold rounded-3">
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Appearance & Theme Preference Card */}
        <div className="card carcare-card border-0 p-4 p-md-5 mt-4 shadow-sm">
          <div className="d-flex align-items-center gap-2 mb-2">
            <i className="bi bi-palette-fill text-danger fs-5"></i>
            <h5 className="fw-bold text-dark mb-0">Appearance & Theme</h5>
          </div>
          <p className="text-secondary small mb-4">
            Customize how CarCare-Pro looks for you. Choose between light, dark, or sync with your system preference.
          </p>

          <div className="row g-3">
            <div className="col-sm-4">
              <div
                onClick={() => setTheme('light')}
                className={`p-3 rounded-3 border text-center cursor-pointer transition-all ${
                  themeMode === 'light'
                    ? 'border-danger bg-danger bg-opacity-10 shadow-sm'
                    : 'bg-light hover-shadow'
                }`}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex="0"
              >
                <div className="fs-2 text-danger mb-2">
                  <i className="bi bi-sun-fill"></i>
                </div>
                <div className="fw-bold text-dark">Light Theme</div>
                <small className="text-secondary d-block">Crisp, clean & bright</small>
                {themeMode === 'light' && (
                  <span className="badge bg-danger text-white mt-2 px-2 py-1">Active</span>
                )}
              </div>
            </div>

            <div className="col-sm-4">
              <div
                onClick={() => setTheme('dark')}
                className={`p-3 rounded-3 border text-center cursor-pointer transition-all ${
                  themeMode === 'dark'
                    ? 'border-danger bg-danger bg-opacity-10 shadow-sm'
                    : 'bg-light hover-shadow'
                }`}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex="0"
              >
                <div className="fs-2 text-danger mb-2">
                  <i className="bi bi-moon-stars-fill"></i>
                </div>
                <div className="fw-bold text-dark">Dark Theme</div>
                <small className="text-secondary d-block">Easy on the eyes</small>
                {themeMode === 'dark' && (
                  <span className="badge bg-danger text-white mt-2 px-2 py-1">Active</span>
                )}
              </div>
            </div>

            <div className="col-sm-4">
              <div
                onClick={() => setTheme('system')}
                className={`p-3 rounded-3 border text-center cursor-pointer transition-all ${
                  themeMode === 'system'
                    ? 'border-danger bg-danger bg-opacity-10 shadow-sm'
                    : 'bg-light hover-shadow'
                }`}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex="0"
              >
                <div className="fs-2 text-danger mb-2">
                  <i className="bi bi-display"></i>
                </div>
                <div className="fw-bold text-dark">System Default</div>
                <small className="text-secondary d-block">Match OS preference</small>
                {themeMode === 'system' && (
                  <span className="badge bg-danger text-white mt-2 px-2 py-1">Active</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

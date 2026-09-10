import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import BookServices from './pages/BookServices';
import Vehicles from './pages/Vehicles';
import AddVehicle from './pages/AddVehicle';
import ServiceHistory from './pages/ServiceHistory';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

function AppContent() {
  const { isAdmin } = useAuth();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          {/* Public / Customer Routes - redirect admin to /admin */}
          <Route path="/" element={isAdmin ? <Navigate to="/admin" replace /> : <Home />} />
          <Route path="/services" element={isAdmin ? <Navigate to="/admin" replace /> : <Services />} />
          <Route path="/services/:id" element={isAdmin ? <Navigate to="/admin" replace /> : <ServiceDetails />} />
          <Route path="/book-service" element={isAdmin ? <Navigate to="/admin" replace /> : <BookServices />} />
          <Route path="/login" element={isAdmin ? <Navigate to="/admin" replace /> : <Login />} />
          <Route path="/register" element={isAdmin ? <Navigate to="/admin" replace /> : <Register />} />

          {/* User Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehicles"
            element={
              <ProtectedRoute>
                <Vehicles />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-vehicle"
            element={
              <ProtectedRoute>
                <AddVehicle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/service-history"
            element={
              <ProtectedRoute>
                <ServiceHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <ServiceHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* 404 Route */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <DataProvider>
            <ThemeProvider>
              <AppContent />
            </ThemeProvider>
          </DataProvider>
        </AuthProvider>
      </Router>
    </Provider>
  );
}

export default App;

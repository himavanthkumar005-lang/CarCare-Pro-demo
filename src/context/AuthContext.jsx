import { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  login as reduxLogin,
  registerUser as reduxRegister,
  logout as reduxLogout,
  updateProfile as reduxUpdateProfile,
  clearAuthError
} from '../redux/authSlice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { currentUser, users, isAuthenticated, isAdmin, error } = useSelector((state) => state.auth);

  const handleLogin = (email, password, expectedRole = null) => {
    dispatch(clearAuthError());
    const trimmedEmail = email.trim().toLowerCase();
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === trimmedEmail && u.password === password
    );

    if (!foundUser) {
      return { success: false, message: 'Invalid email or password.' };
    }

    if (expectedRole && foundUser.role !== expectedRole) {
      return {
        success: false,
        message: `Account found, but role is "${foundUser.role}". Please switch to ${foundUser.role === 'admin' ? 'Admin' : 'Customer'} login.`
      };
    }

    dispatch(reduxLogin({ email, password, expectedRole }));
    return { success: true, user: foundUser };
  };

  const handleRegister = ({ name, email, password, role = 'user', phone = '', address = '' }) => {
    dispatch(clearAuthError());
    const trimmedEmail = email.trim().toLowerCase();
    const existing = users.find((u) => u.email.toLowerCase() === trimmedEmail);

    if (existing) {
      return { success: false, message: 'An account with this email address already exists.' };
    }

    dispatch(reduxRegister({ name, email, password, role, phone, address }));
    return { success: true };
  };

  const handleLogout = () => {
    dispatch(reduxLogout());
  };

  const handleUpdateProfile = (updatedFields) => {
    dispatch(reduxUpdateProfile(updatedFields));
  };

  const value = {
    currentUser,
    users,
    isAuthenticated,
    isAdmin,
    authError: error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    updateProfile: handleUpdateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

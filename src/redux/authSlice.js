import { createSlice } from '@reduxjs/toolkit';
import initialUsers from '../data/users.json';

const getInitialUsers = () => {
  try {
    const saved = localStorage.getItem('carcare_users');
    return saved ? JSON.parse(saved) : initialUsers;
  } catch (e) {
    console.error('Error loading users:', e);
    return initialUsers;
  }
};

const getInitialCurrentUser = () => {
  try {
    const saved = localStorage.getItem('carcare_current_user');
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.error('Error loading current user:', e);
    return null;
  }
};

const initialCurrentUser = getInitialCurrentUser();

const initialState = {
  users: getInitialUsers(),
  currentUser: initialCurrentUser,
  isAuthenticated: !!initialCurrentUser,
  isAdmin: initialCurrentUser?.role === 'admin',
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password, expectedRole } = action.payload;
      const trimmedEmail = email.trim().toLowerCase();
      const foundUser = state.users.find(
        (u) => u.email.toLowerCase() === trimmedEmail && u.password === password
      );

      if (!foundUser) {
        state.error = 'Invalid email or password.';
        return;
      }

      if (expectedRole && foundUser.role !== expectedRole) {
        state.error = `Account found, but role is "${foundUser.role}". Please switch to ${foundUser.role === 'admin' ? 'Admin' : 'Customer'} login.`;
        return;
      }

      state.currentUser = foundUser;
      state.isAuthenticated = true;
      state.isAdmin = foundUser.role === 'admin';
      state.error = null;
      localStorage.setItem('carcare_current_user', JSON.stringify(foundUser));
    },
    registerUser: (state, action) => {
      const { name, email, password, role = 'user', phone = '', address = '' } = action.payload;
      const trimmedEmail = email.trim().toLowerCase();
      const existing = state.users.find((u) => u.email.toLowerCase() === trimmedEmail);

      if (existing) {
        state.error = 'An account with this email address already exists.';
        return;
      }

      const newUser = {
        id: `u-${Date.now()}`,
        name,
        email: trimmedEmail,
        password,
        role,
        phone,
        address,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
        createdAt: new Date().toISOString().split('T')[0]
      };

      state.users.push(newUser);
      state.currentUser = newUser;
      state.isAuthenticated = true;
      state.isAdmin = newUser.role === 'admin';
      state.error = null;

      localStorage.setItem('carcare_users', JSON.stringify(state.users));
      localStorage.setItem('carcare_current_user', JSON.stringify(newUser));
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.error = null;
      localStorage.removeItem('carcare_current_user');
    },
    updateProfile: (state, action) => {
      if (!state.currentUser) return;
      const updatedUser = { ...state.currentUser, ...action.payload };
      state.currentUser = updatedUser;
      state.users = state.users.map((u) => (u.id === updatedUser.id ? updatedUser : u));

      localStorage.setItem('carcare_users', JSON.stringify(state.users));
      localStorage.setItem('carcare_current_user', JSON.stringify(updatedUser));
    },
    clearAuthError: (state) => {
      state.error = null;
    }
  }
});

export const { login, registerUser, logout, updateProfile, clearAuthError } = authSlice.actions;
export default authSlice.reducer;

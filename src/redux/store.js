import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import serviceReducer from './serviceSlice';
import vehicleReducer from './vehicleSlice';
import appointmentReducer from './appointmentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer,
    vehicles: vehicleReducer,
    appointments: appointmentReducer
  }
});

export default store;

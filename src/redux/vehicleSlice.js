import { createSlice } from '@reduxjs/toolkit';
import initialVehicles from '../data/vehicles.json';

const getInitialVehicles = () => {
  try {
    const saved = localStorage.getItem('carcare_vehicles');
    return saved ? JSON.parse(saved) : initialVehicles;
  } catch (e) {
    console.error('Error loading vehicles:', e);
    return initialVehicles;
  }
};

const initialState = {
  vehicles: getInitialVehicles()
};

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    addVehicle: (state, action) => {
      const newVehicle = {
        ...action.payload,
        id: `veh-${Date.now()}`,
        year: Number(action.payload.year),
        createdAt: new Date().toISOString().split('T')[0]
      };
      state.vehicles.unshift(newVehicle);
      localStorage.setItem('carcare_vehicles', JSON.stringify(state.vehicles));
    },
    updateVehicle: (state, action) => {
      const { id, updatedData } = action.payload;
      state.vehicles = state.vehicles.map((v) =>
        v.id === id ? { ...v, ...updatedData } : v
      );
      localStorage.setItem('carcare_vehicles', JSON.stringify(state.vehicles));
    },
    deleteVehicle: (state, action) => {
      state.vehicles = state.vehicles.filter((v) => v.id !== action.payload);
      localStorage.setItem('carcare_vehicles', JSON.stringify(state.vehicles));
    },
    resetVehicles: (state) => {
      state.vehicles = initialVehicles;
      localStorage.setItem('carcare_vehicles', JSON.stringify(initialVehicles));
    }
  }
});

export const { addVehicle, updateVehicle, deleteVehicle, resetVehicles } = vehicleSlice.actions;
export default vehicleSlice.reducer;

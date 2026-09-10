import { createSlice } from '@reduxjs/toolkit';
import initialServices from '../data/services.json';

const getInitialServices = () => {
  try {
    const saved = localStorage.getItem('carcare_services');
    return saved ? JSON.parse(saved) : initialServices;
  } catch (e) {
    console.error('Error loading services:', e);
    return initialServices;
  }
};

const initialState = {
  services: getInitialServices(),
  selectedCategory: 'All',
  searchTerm: ''
};

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    addService: (state, action) => {
      const newService = {
        ...action.payload,
        id: `srv-${Date.now()}`,
        price: Number(action.payload.price)
      };
      state.services.push(newService);
      localStorage.setItem('carcare_services', JSON.stringify(state.services));
    },
    updateService: (state, action) => {
      const { id, updatedData } = action.payload;
      state.services = state.services.map((srv) =>
        srv.id === id
          ? { ...srv, ...updatedData, price: Number(updatedData.price || srv.price) }
          : srv
      );
      localStorage.setItem('carcare_services', JSON.stringify(state.services));
    },
    deleteService: (state, action) => {
      state.services = state.services.filter((srv) => srv.id !== action.payload);
      localStorage.setItem('carcare_services', JSON.stringify(state.services));
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    resetServices: (state) => {
      state.services = initialServices;
      localStorage.setItem('carcare_services', JSON.stringify(initialServices));
    }
  }
});

export const {
  addService,
  updateService,
  deleteService,
  setSelectedCategory,
  setSearchTerm,
  resetServices
} = serviceSlice.actions;

export default serviceSlice.reducer;

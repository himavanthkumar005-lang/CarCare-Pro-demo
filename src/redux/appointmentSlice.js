import { createSlice } from '@reduxjs/toolkit';
import initialAppointments from '../data/appointments.json';

const getInitialAppointments = () => {
  try {
    const saved = localStorage.getItem('carcare_appointments');
    return saved ? JSON.parse(saved) : initialAppointments;
  } catch (e) {
    console.error('Error loading appointments:', e);
    return initialAppointments;
  }
};

const initialState = {
  appointments: getInitialAppointments()
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    bookAppointment: (state, action) => {
      const newAppointment = {
        ...action.payload,
        id: `apt-${Date.now()}`,
        status: 'Pending',
        assignedMechanic: 'Pending Assignment',
        technicianNotes: '',
        totalCost: Number(action.payload.totalCost || 0),
        createdAt: new Date().toISOString().split('T')[0]
      };
      state.appointments.unshift(newAppointment);
      localStorage.setItem('carcare_appointments', JSON.stringify(state.appointments));
    },
    updateAppointmentStatus: (state, action) => {
      const { id, status, technicianNotes, assignedMechanic, totalCost } = action.payload;
      state.appointments = state.appointments.map((apt) => {
        if (apt.id === id) {
          return {
            ...apt,
            status,
            ...(technicianNotes !== undefined && technicianNotes !== null && { technicianNotes }),
            ...(assignedMechanic !== undefined && assignedMechanic !== null && { assignedMechanic }),
            ...(totalCost !== undefined && totalCost !== null && { totalCost: Number(totalCost) })
          };
        }
        return apt;
      });
      localStorage.setItem('carcare_appointments', JSON.stringify(state.appointments));
    },
    cancelAppointment: (state, action) => {
      state.appointments = state.appointments.map((apt) =>
        apt.id === action.payload ? { ...apt, status: 'Cancelled' } : apt
      );
      localStorage.setItem('carcare_appointments', JSON.stringify(state.appointments));
    },
    resetAppointments: (state) => {
      state.appointments = initialAppointments;
      localStorage.setItem('carcare_appointments', JSON.stringify(initialAppointments));
    }
  }
});

export const {
  bookAppointment,
  updateAppointmentStatus,
  cancelAppointment,
  resetAppointments
} = appointmentSlice.actions;

export default appointmentSlice.reducer;

import { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addService as reduxAddService,
  updateService as reduxUpdateService,
  deleteService as reduxDeleteService,
  resetServices
} from '../redux/serviceSlice';
import {
  addVehicle as reduxAddVehicle,
  updateVehicle as reduxUpdateVehicle,
  deleteVehicle as reduxDeleteVehicle,
  resetVehicles
} from '../redux/vehicleSlice';
import {
  bookAppointment as reduxBookAppointment,
  updateAppointmentStatus as reduxUpdateAppointmentStatus,
  cancelAppointment as reduxCancelAppointment,
  resetAppointments
} from '../redux/appointmentSlice';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const dispatch = useDispatch();

  const services = useSelector((state) => state.services.services);
  const vehicles = useSelector((state) => state.vehicles.vehicles);
  const appointments = useSelector((state) => state.appointments.appointments);

  // Vehicle helpers
  const getUserVehicles = (userId) => {
    if (!userId) return [];
    return vehicles.filter((v) => v.userId === userId);
  };

  const addVehicle = (vehicleData) => {
    dispatch(reduxAddVehicle(vehicleData));
    return {
      ...vehicleData,
      id: `veh-${Date.now()}`
    };
  };

  const updateVehicle = (id, updatedData) => {
    dispatch(reduxUpdateVehicle({ id, updatedData }));
  };

  const deleteVehicle = (id) => {
    dispatch(reduxDeleteVehicle(id));
  };

  // Appointment helpers
  const bookAppointment = (appointmentData) => {
    const newId = `apt-${Date.now()}`;
    const fullAppointment = {
      ...appointmentData,
      id: newId,
      status: 'Pending',
      assignedMechanic: 'Pending Assignment',
      technicianNotes: '',
      createdAt: new Date().toISOString().split('T')[0]
    };
    dispatch(reduxBookAppointment(fullAppointment));
    return fullAppointment;
  };

  const updateAppointmentStatus = (id, newStatus, technicianNotes = null, assignedMechanic = null, totalCost = null) => {
    dispatch(
      reduxUpdateAppointmentStatus({
        id,
        status: newStatus,
        technicianNotes,
        assignedMechanic,
        totalCost
      })
    );
  };

  const cancelAppointment = (id) => {
    dispatch(reduxCancelAppointment(id));
  };

  // Service helpers
  const addService = (serviceData) => {
    dispatch(reduxAddService(serviceData));
  };

  const updateService = (id, updatedData) => {
    dispatch(reduxUpdateService({ id, updatedData }));
  };

  const deleteService = (id) => {
    dispatch(reduxDeleteService(id));
  };

  // Reset all to defaults
  const resetToDefaultData = () => {
    dispatch(resetServices());
    dispatch(resetVehicles());
    dispatch(resetAppointments());
  };

  const value = {
    services,
    vehicles,
    appointments,
    getUserVehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    bookAppointment,
    updateAppointmentStatus,
    cancelAppointment,
    addService,
    updateService,
    deleteService,
    resetToDefaultData
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointmentStatus: null,
  appointments: [],
  appointmentsByDate: [],
  allAppointmentDates: [],
  allAppointmentCalendar: [],
  paginationMeta: null,
  appointment: null,
  appointmentDuration: null,
  loading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    // Create Appointment Reducers
    createAppointmentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createAppointmentSuccess: (state, action) => {
      state.loading = false;
      state.appointmentStatus = action.payload;
    },
    createAppointmentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Fetch Appointments Reducers
    fetchAppointmentsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAppointmentsSuccess: (state, action) => {
      state.loading = false;
      state.appointments = action.payload.items;
      state.paginationMeta = action.payload.meta;
    },
    fetchAppointmentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Fetch Single Appointment Reducers
    fetchAppointmentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAppointmentSuccess: (state, action) => {
      state.loading = false;
      state.appointment = action.payload;
    },
    fetchAppointmentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Update Appointment Reducers
    updateAppointmentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateAppointmentSuccess: (state, action) => {
      state.loading = false;
      state.appointmentStatus = action.payload;
    },
    updateAppointmentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Delete Appointment Reducers
    deleteAppointmentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteAppointmentSuccess: (state, action) => {
      state.loading = false;
      state.appointmentStatus = action.payload;
      state.appointments = state.appointments.filter(
        (appointment) => appointment.id !== action.payload
      ); // Remove deleted appointment from state
    },
    deleteAppointmentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Mark Appointment as Finished Reducers
    markAppointmentAsFinishedRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    markAppointmentAsFinishedSuccess: (state, action) => {
      state.loading = false;
      state.appointmentStatus = action.payload;
    },
    markAppointmentAsFinishedFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Cancel Appointment Reducers
    cancelAppointmentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    cancelAppointmentSuccess: (state, action) => {
      state.loading = false;
      state.appointmentStatus = action.payload;
    },
    cancelAppointmentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Set Appointment Duration Reducers
    setAppointmentDurationRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    setAppointmentDurationSuccess: (state, action) => {
      state.loading = false;
      state.appointmentStatus = action.payload;
    },
    setAppointmentDurationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // get Appointment Duration Reducers
    getAppointmentDurationRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAppointmentDurationSuccess: (state, action) => {
      state.loading = false;
      state.appointmentDuration = action.payload;
    },
    getAppointmentDurationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Fetch Appointments by Date Reducers
    fetchAppointmentsByDateRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAppointmentsByDateSuccess: (state, action) => {
      state.loading = false;
      state.appointmentsByDate = action.payload;
    },
    fetchAppointmentsByDateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Fetch All Appointment Dates Reducers
    fetchAllAppointmentDatesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAllAppointmentDatesSuccess: (state, action) => {
      state.loading = false;
      state.allAppointmentDates = action.payload.map((date) => {
        const [datePart, timePart] = date.split("T");
        return [datePart, timePart.split(".")[0]]; // Splitting to get only hh:mm:ss part
      });
    },
    fetchAllAppointmentDatesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Fetch All Appointments Calendar Reducers
    fetchAllAppointmentCalendarRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAllAppointmentCalendarSuccess: (state, action) => {
      state.loading = false;
      state.allAppointmentCalendar = action.payload;
    },
    fetchAllAppointmentCalendarFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createAppointmentRequest,
  createAppointmentSuccess,
  createAppointmentFailure,
  fetchAppointmentsRequest,
  fetchAppointmentsSuccess,
  fetchAppointmentsFailure,
  fetchAppointmentRequest,
  fetchAppointmentSuccess,
  fetchAppointmentFailure,
  updateAppointmentRequest,
  updateAppointmentSuccess,
  updateAppointmentFailure,
  deleteAppointmentRequest,
  deleteAppointmentSuccess,
  deleteAppointmentFailure,
  markAppointmentAsFinishedRequest,
  markAppointmentAsFinishedSuccess,
  markAppointmentAsFinishedFailure,
  cancelAppointmentRequest,
  cancelAppointmentSuccess,
  cancelAppointmentFailure,
  setAppointmentDurationRequest,
  setAppointmentDurationSuccess,
  setAppointmentDurationFailure,
  getAppointmentDurationRequest,
  getAppointmentDurationSuccess,
  getAppointmentDurationFailure,
  fetchAppointmentsByDateRequest,
  fetchAppointmentsByDateSuccess,
  fetchAppointmentsByDateFailure,
  fetchAllAppointmentDatesRequest,
  fetchAllAppointmentDatesSuccess,
  fetchAllAppointmentDatesFailure,
  fetchAllAppointmentCalendarRequest,
  fetchAllAppointmentCalendarSuccess,
  fetchAllAppointmentCalendarFailure,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;

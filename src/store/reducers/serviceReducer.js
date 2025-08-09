import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: [],
  loading: false,
  error: null,
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    // Fetch Services Reducers
    fetchServicesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchServicesSuccess: (state, action) => {
      state.loading = false;
      state.services = action.payload;
    },
    fetchServicesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Create Service Reducers
    createServiceRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createServiceSuccess: (state, action) => {
      state.loading = false;
      state.services.push(action.payload);
    },
    createServiceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Update Service Reducers
    updateServiceRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateServiceSuccess: (state, action) => {
      state.loading = false;
      const index = state.services.findIndex(service => service.id === action.payload.id);
      if (index !== -1) {
        state.services[index] = action.payload;
      }
    },
    updateServiceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Delete Service Reducers
    deleteServiceRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteServiceSuccess: (state, action) => {
      state.loading = false;
      state.services = state.services.filter(service => service.id !== action.payload);
    },
    deleteServiceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchServicesRequest,
  fetchServicesSuccess,
  fetchServicesFailure,
  createServiceRequest,
  createServiceSuccess,
  createServiceFailure,
  updateServiceRequest,
  updateServiceSuccess,
  updateServiceFailure,
  deleteServiceRequest,
  deleteServiceSuccess,
  deleteServiceFailure,
} = serviceSlice.actions;

export default serviceSlice.reducer;

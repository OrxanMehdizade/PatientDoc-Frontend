import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patients: [],
  patientData: null,
  allPatients: [],
  updateStatus: false,
  loading: false,
  error: null,
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    createPatientRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createPatientSuccess: (state, action) => {
      state.loading = false;
      state.patientData = action.payload;
    },
    createPatientFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchPatientsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPatientsSuccess: (state, action) => {
      state.loading = false;
      state.patients = action.payload.items;
    },
    fetchPatientsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchPatientRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPatientSuccess: (state, action) => {
      state.loading = false;
      state.patientData = action.payload;
    },
    fetchPatientFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletePatientRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deletePatientSuccess: (state, action) => {
      state.loading = false;
      state.patients = state.patients.filter(
        (patient) => patient.id !== action.payload
      );
    },
    deletePatientFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchAllPatientsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAllPatientsSuccess: (state, action) => {
      state.loading = false;
      state.allPatients = action.payload;
    },
    fetchAllPatientsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePatientRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updatePatientSuccess: (state, action) => {
      state.loading = false;
      state.updateStatus = action.payload;
    },
    updatePatientFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createPatientRequest,
  createPatientSuccess,
  createPatientFailure,
  fetchPatientsRequest,
  fetchPatientsSuccess,
  fetchPatientsFailure,
  fetchPatientRequest,
  fetchPatientSuccess,
  fetchPatientFailure,
  deletePatientRequest,
  deletePatientSuccess,
  deletePatientFailure,
  fetchAllPatientsRequest,
  fetchAllPatientsSuccess,
  fetchAllPatientsFailure,
  updatePatientRequest,
  updatePatientSuccess,
  updatePatientFailure,
} = patientSlice.actions;

export default patientSlice.reducer;

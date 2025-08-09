import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  treatmentStatus: null,
  treatments: [],
  treatment: null,
  paginationMeta: null,
  loading: false,
  error: null,
};

const treatmentSlice = createSlice({
  name: "treatment",
  initialState,
  reducers: {
    createTreatmentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createTreatmentSuccess: (state, action) => {
      state.loading = false;
      state.treatmentStatus = action.payload;
    },
    createTreatmentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchTreatmentsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTreatmentsSuccess: (state, action) => {
      state.loading = false;
      state.treatments = action.payload.items;
      state.paginationMeta = action.payload.meta;
    },
    fetchTreatmentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchTreatmentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTreatmentSuccess: (state, action) => {
      state.loading = false;
      state.treatment = action.payload;
    },
    fetchTreatmentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTreatmentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTreatmentSuccess: (state, action) => {
      state.loading = false;
      state.treatmentStatus = action.payload;
      state.treatments = state.treatments.filter(
        (treatment) => treatment.id !== action.payload
      );
    },
    deleteTreatmentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchAllTreatmentsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAllTreatmentsSuccess: (state, action) => {
      state.loading = false;
      state.treatments = action.payload;
    },
    fetchAllTreatmentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTreatmentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTreatmentSuccess: (state, action) => {
      state.loading = false;
      state.treatmentStatus = action.payload;
    },
    updateTreatmentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createTreatmentRequest,
  createTreatmentSuccess,
  createTreatmentFailure,
  fetchTreatmentsRequest,
  fetchTreatmentsSuccess,
  fetchTreatmentsFailure,
  fetchTreatmentRequest,
  fetchTreatmentSuccess,
  fetchTreatmentFailure,
  deleteTreatmentRequest,
  deleteTreatmentSuccess,
  deleteTreatmentFailure,
  fetchAllTreatmentsRequest,
  fetchAllTreatmentsSuccess,
  fetchAllTreatmentsFailure,
  updateTreatmentRequest,
  updateTreatmentSuccess,
  updateTreatmentFailure,
} = treatmentSlice.actions;

export default treatmentSlice.reducer;

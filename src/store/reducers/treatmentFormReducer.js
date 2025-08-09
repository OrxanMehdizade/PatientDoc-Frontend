import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  treatmentForms: [],
  loading: false,
  error: null,
};

const treatmentFormSlice = createSlice({
  name: "treatmentForm",
  initialState,
  reducers: {
    // Fetch Treatment Forms Reducers
    fetchTreatmentFormsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTreatmentFormsSuccess: (state, action) => {
      state.loading = false;
      state.treatmentForms = action.payload;
    },
    fetchTreatmentFormsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Create Treatment Form Reducers
    createTreatmentFormRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createTreatmentFormSuccess: (state, action) => {
      state.loading = false;
      state.treatmentForms.push(action.payload);
    },
    createTreatmentFormFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Update Treatment Form Reducers
    updateTreatmentFormRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTreatmentFormSuccess: (state, action) => {
      state.loading = false;
      const index = state.treatmentForms.findIndex(form => form.id === action.payload.id);
      if (index !== -1) {
        state.treatmentForms[index] = action.payload;
      }
    },
    updateTreatmentFormFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Delete Treatment Form Reducers
    deleteTreatmentFormRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTreatmentFormSuccess: (state, action) => {
      state.loading = false;
      state.treatmentForms = state.treatmentForms.filter(form => form.id !== action.payload.id);
    },
    deleteTreatmentFormFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTreatmentFormsRequest,
  fetchTreatmentFormsSuccess,
  fetchTreatmentFormsFailure,
  createTreatmentFormRequest,
  createTreatmentFormSuccess,
  createTreatmentFormFailure,
  updateTreatmentFormRequest,
  updateTreatmentFormSuccess,
  updateTreatmentFormFailure,
  deleteTreatmentFormRequest,
  deleteTreatmentFormSuccess,
  deleteTreatmentFormFailure,
} = treatmentFormSlice.actions;

export default treatmentFormSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  diagnoses: [],
  loading: false,
  error: null,
};

const diagnoseSlice = createSlice({
  name: "diagnose",
  initialState,
  reducers: {
    // Fetch Diagnoses Reducers
    fetchDiagnosesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDiagnosesSuccess: (state, action) => {
      state.loading = false;
      state.diagnoses = action.payload;
    },
    fetchDiagnosesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Create Diagnose Reducers
    createDiagnoseRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createDiagnoseSuccess: (state, action) => {
      state.loading = false;
      state.diagnoses.push(action.payload);
    },
    createDiagnoseFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Update Diagnose Reducers
    updateDiagnoseRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateDiagnoseSuccess: (state, action) => {
      state.loading = false;
      const index = state.diagnoses.findIndex(diagnose => diagnose.id === action.payload.id);
      if (index !== -1) {
        state.diagnoses[index] = action.payload;
      }
    },
    updateDiagnoseFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Delete Diagnose Reducers
    deleteDiagnoseRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteDiagnoseSuccess: (state, action) => {
      state.loading = false;
      state.diagnoses = state.diagnoses.filter(diagnose => diagnose.id !== action.payload);
    },
    deleteDiagnoseFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDiagnosesRequest,
  fetchDiagnosesSuccess,
  fetchDiagnosesFailure,
  createDiagnoseRequest,
  createDiagnoseSuccess,
  createDiagnoseFailure,
  updateDiagnoseRequest,
  updateDiagnoseSuccess,
  updateDiagnoseFailure,
  deleteDiagnoseRequest,
  deleteDiagnoseSuccess,
  deleteDiagnoseFailure,
} = diagnoseSlice.actions;

export default diagnoseSlice.reducer;

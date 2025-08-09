import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  medicines: [],
  loading: false,
  error: null,
};

const medicineSlice = createSlice({
  name: "medicine",
  initialState,
  reducers: {
    // Fetch Medicines Reducers
    fetchMedicinesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMedicinesSuccess: (state, action) => {
      state.loading = false;
      state.medicines = action.payload;
    },
    fetchMedicinesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Create Medicine Reducers
    createMedicineRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createMedicineSuccess: (state, action) => {
      state.loading = false;
      state.medicines.push(action.payload);
    },
    createMedicineFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Update Medicine Reducers
    updateMedicineRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateMedicineSuccess: (state, action) => {
      state.loading = false;
      const index = state.medicines.findIndex(medicine => medicine.id === action.payload.id);
      if (index !== -1) {
        state.medicines[index] = action.payload;
      }
    },
    updateMedicineFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Delete Medicine Reducers
    deleteMedicineRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteMedicineSuccess: (state, action) => {
      state.loading = false;
      state.medicines = state.medicines.filter(medicine => medicine.id !== action.payload);
    },
    deleteMedicineFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchMedicinesRequest,
  fetchMedicinesSuccess,
  fetchMedicinesFailure,
  createMedicineRequest,
  createMedicineSuccess,
  createMedicineFailure,
  updateMedicineRequest,
  updateMedicineSuccess,
  updateMedicineFailure,
  deleteMedicineRequest,
  deleteMedicineSuccess,
  deleteMedicineFailure,
} = medicineSlice.actions;

export default medicineSlice.reducer;

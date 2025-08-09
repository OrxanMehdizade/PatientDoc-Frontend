import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  generalStatistics: {
    totalAppointments: 0,
    totalTreatments: 0,
    totalPatients: 0,
  },
  appealStatistics: {
    socialMedia: 0,
    doctorReferral: 0,
    clinicReferral: 0,
    personal: 0,
  },
  loading: false,
  error: null,
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    // General Statistics Reducers
    fetchGeneralStatisticsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchGeneralStatisticsSuccess: (state, action) => {
      state.loading = false;
      state.generalStatistics = action.payload;
    },
    fetchGeneralStatisticsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Appeal Statistics Reducers
    fetchAppealStatisticsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAppealStatisticsSuccess: (state, action) => {
      state.loading = false;
      state.appealStatistics = action.payload;
    },
    fetchAppealStatisticsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchGeneralStatisticsRequest,
  fetchGeneralStatisticsSuccess,
  fetchGeneralStatisticsFailure,
  fetchAppealStatisticsRequest,
  fetchAppealStatisticsSuccess,
  fetchAppealStatisticsFailure,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;

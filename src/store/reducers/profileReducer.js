import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  loading: false,
  error: null,
  changePasswordSuccess: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    fetchProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProfileSuccess: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    fetchProfileFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    updateProfileFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    changePasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.changePasswordSuccess = false;
    },
    changePasswordSuccess: (state) => {
      state.loading = false;
      state.changePasswordSuccess = true;
    },
    changePasswordFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchProfileRequest,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
} = profileSlice.actions;

export default profileSlice.reducer;

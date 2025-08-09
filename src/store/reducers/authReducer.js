import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  checkEmailMessage: null,
  fullName: null,
  userExist: false,
  accessToken: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSuccess: (state, action) => {
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("fullName", action.payload.fullName);
      localStorage.setItem("profileImgUrl", action.payload.profileImgUrl);

      return {
        ...state,
        accessToken: action.payload.accessToken,
        error: null,
      };
    },
    authFailure: (state, action) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("email");
      localStorage.removeItem("fullName");
      localStorage.removeItem("profileImgUrl");
      return {
        ...state,
        accessToken: null,
        error: action.payload,
      };
    },
    confirmOTPSuccess: (state, action) => {
      return {
        ...state,
        emailConfirmed: true,
        error: null,
      };
    },
    confirmOTPFailure: (state, action) => {
      return {
        ...state,
        emailConfirmed: false,
        error: action.payload,
      };
    },
    checkEmailSuccess: (state, action) => {
      return {
        ...state,
        checkEmailMessage: action.payload.message,
        email: action.payload.email,
        userExist: false,
        error: null,
      };
    },
    checkEmailFailure: (state, action) => {
      return {
        ...state,
        checkEmailMessage: null,
        email: null,
        userExist: true,
        error: action.payload,
      };
    },
    forgetPasswordSuccess: (state, action) => {
      return {
        ...state,
        passwordSended: true,
        error: null,
      };
    },
    forgetPasswordFailure: (state, action) => {
      return {
        ...state,
        passwordSended: false,
        error: action.payload,
      };
    },
  },
});

export const {
  authSuccess,
  authFailure,
  confirmOTPSuccess,
  confirmOTPFailure,
  checkEmailSuccess,
  checkEmailFailure,
  forgetPasswordSuccess,
  forgetPasswordFailure,
} = authSlice.actions;
export default authSlice.reducer;

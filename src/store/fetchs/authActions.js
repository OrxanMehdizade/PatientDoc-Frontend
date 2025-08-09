import {
  authSuccess,
  checkEmailSuccess,
  forgetPasswordSuccess,
  confirmOTPSuccess,
} from "../reducers/authReducer";
import fetchBaseUrl from "./fetchBaseURL.json";

const baseUrl = fetchBaseUrl.API_BASE_URL;

export const loginFetch = (email, password) => (dispatch) => {
  return fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(await response.text());
      }
      return response.json();
    })
    .then((data) => {
      dispatch(authSuccess(data));
    });
};

export const registerFetch =
  (email, name, surname, hospital, password) => (dispatch) => {
    return fetch(`${baseUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, surname, hospital, password }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(await response.text());
        }
        return response.json();
      })
      .then((data) => {
        dispatch(authSuccess(data));
      });
  };

export const checkEmailFetch = (email) => (dispatch) => {
  return fetch(`${baseUrl}/api/auth/check-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(await response.text());
      }
      return response.json();
    })
    .then((data) => {
      dispatch(checkEmailSuccess(data));
    });
};

export const resendOtpFetch = (email) => (dispatch) => {
  return fetch(`${baseUrl}/api/auth/resend-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(await response.text());
      }
      return response.json();
    })
    .then((data) => {
      dispatch(checkEmailSuccess(data));
    });
};

export const forgetPasswordFetch = (email) => (dispatch) => {
  return fetch(`${baseUrl}/api/auth/forget-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(await response.text());
      }
      return response.text();
    })
    .then((data) => {
      dispatch(forgetPasswordSuccess(data));
    });
};

export const confirmOTPFetch =
  (email, verificationCode) => (dispatch) => {
    return fetch(`${baseUrl}/api/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, verificationCode }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(await response.text());
        }
        return response.text();
      })
      .then((data) => {
        dispatch(confirmOTPSuccess(data));
      });
  };

export const refreshTokenFetch = () => (dispatch) => {
  const refreshToken = localStorage.getItem("refreshToken");
  return fetch(`${baseUrl}/api/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(await response.text());
      }
      return response.json();
    })
    .then((data) => {
      dispatch(authSuccess(data));
      return data;
    })
    .catch((error) => {
      logoutUser();
    });
};

export const logoutFetch = () => (dispatch) => {
  let accessToken = localStorage.getItem("accessToken");

  return fetch(`${baseUrl}/api/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(await response.json());
      }
      dispatch(logoutUser());
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const logoutUser = () => (dispatch) => {
  console.log("salam");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("profileImgUrl");
  localStorage.removeItem("fullName");
  localStorage.removeItem("email");
  window.location.reload();
};

import {
  fetchProfileRequest,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  changePasswordSuccess,
  changePasswordFailure,
  changePasswordRequest,
} from "../reducers/profileReducer";
import fetchWithAuth from "./fetchWithAuth";
import fetchBaseUrl from "./fetchBaseURL.json";

const baseUrl = fetchBaseUrl.API_BASE_URL;

export const fetchProfileData = () => async (dispatch) => {
  dispatch(fetchProfileRequest());
  try {
    const response = await fetchWithAuth(
      `${baseUrl}/api/Profile/get-profile-data`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      dispatch(fetchProfileSuccess(data));
    } else {
      dispatch(fetchProfileFailure(data.message));
    }
  } catch (error) {
    dispatch(fetchProfileFailure(error.message));
  }
};

export const updateProfileData = (profileData) => async (dispatch) => {
  dispatch(updateProfileRequest());
  try {
    const response = await fetchWithAuth(
      `${baseUrl}/api/Profile/update-profile-data`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      }
    );
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("profileImgUrl", profileData.profilePictureImageUrl);
      dispatch(updateProfileSuccess(data));
    } else {
      dispatch(updateProfileFailure(data.message));
    }
  } catch (error) {
    dispatch(updateProfileFailure(error.message));
  }
};

export const changePassword =
  (currentPassword, newPassword) => async (dispatch) => {
    dispatch(changePasswordRequest());
    try {
      const response = await fetchWithAuth(
        `${baseUrl}/api/Profile/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        }
      );
      const data = await response.text();
      if (response.ok) {
        dispatch(changePasswordSuccess());
      } else {
        dispatch(changePasswordFailure(data.message));
      }
    } catch (error) {
      dispatch(changePasswordFailure(error.message));
    }
  };

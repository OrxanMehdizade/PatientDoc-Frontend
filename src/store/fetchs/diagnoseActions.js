import {
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
} from "../reducers/diagnoseReducer";
import fetchWithAuth from "./fetchWithAuth";
import fetchBaseUrl from "./fetchBaseURL.json";

const baseUrl = fetchBaseUrl.API_BASE_URL;

// Fetch Diagnoses
export const fetchDiagnoses = () => (dispatch) => {
  dispatch(fetchDiagnosesRequest());
  return fetchWithAuth(`${baseUrl}/api/Diagnose/get-diagnoses`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(fetchDiagnosesSuccess(data));
    })
    .catch((err) => {
      dispatch(fetchDiagnosesFailure(err.message));
    });
};

// Create Diagnose
export const createDiagnose = (name) => (dispatch) => {
  dispatch(createDiagnoseRequest());
  return fetchWithAuth(`${baseUrl}/api/Diagnose/create-diagnose`, {
    method: "POST",
    body: JSON.stringify({ name }),
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(createDiagnoseSuccess(data));
      return data;
    })
    .catch((err) => {
      dispatch(createDiagnoseFailure(err.message));
    });
};

// Update Diagnose
export const updateDiagnose = (id, name) => (dispatch) => {
  dispatch(updateDiagnoseRequest());
  return fetchWithAuth(`${baseUrl}/api/Diagnose/update-diagnose/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name }),
  })
    .then((response) => response.text())
    .then((data) => {
      dispatch(updateDiagnoseSuccess(data));
    })
    .catch((err) => {
      dispatch(updateDiagnoseFailure(err.message));
    });
};

// Delete Diagnose
export const deleteDiagnose = (id) => (dispatch) => {
  dispatch(deleteDiagnoseRequest());
  return fetchWithAuth(`${baseUrl}/api/Diagnose/delete-diagnose/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.text())
    .then((data) => {
      dispatch(deleteDiagnoseSuccess(id));
    })
    .catch((err) => {
      dispatch(deleteDiagnoseFailure(err.message));
    });
};

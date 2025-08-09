import {
  createPatientRequest,
  createPatientSuccess,
  fetchPatientsRequest,
  fetchPatientsSuccess,
  fetchPatientsFailure,
  fetchPatientRequest,
  fetchPatientSuccess,
  fetchPatientFailure,
  deletePatientRequest,
  deletePatientSuccess,
  deletePatientFailure,
  fetchAllPatientsRequest,
  fetchAllPatientsSuccess,
  fetchAllPatientsFailure,
  updatePatientRequest,
  updatePatientSuccess,
  updatePatientFailure,
} from "../reducers/patientReducer";
import fetchWithAuth from "./fetchWithAuth";
import fetchBaseUrl from "./fetchBaseURL.json";

const baseUrl = fetchBaseUrl.API_BASE_URL;

// Create Patient
export const createPatientFetch = (patientData) => (dispatch) => {
  dispatch(createPatientRequest());
  return fetchWithAuth(`${baseUrl}/api/patient/create-patient`, {
    method: "POST",
    body: JSON.stringify(patientData),
  })
    .then((response) => response.text())
    .then((data) => {
      dispatch(createPatientSuccess(data));
    });
};

// Update Patient
export const updatePatientFetch = (id, patientData) => (dispatch) => {
  dispatch(updatePatientRequest());
  return fetchWithAuth(`${baseUrl}/api/patient/update-patient/${id}`, {
    method: "PUT",
    body: JSON.stringify(patientData),
  })
    .then((response) => response.text())
    .then((data) => {
      dispatch(updatePatientSuccess(data));
    })
    .catch((err) => {
      dispatch(updatePatientFailure(err.message));
    });
};

// Fetch Patients
export const fetchPatients =
  (page = 1, pageSize = 5) =>
  (dispatch) => {
    dispatch(fetchPatientsRequest());
    return fetchWithAuth(
      `${baseUrl}/api/patient/get-all-patients?page=${page}&pagesize=${pageSize}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchPatientsSuccess(data));
      })
      .catch((err) => {
        dispatch(fetchPatientsFailure(err.message));
      });
  };

// Fetch Single Patient by ID
export const fetchPatientById = (id) => (dispatch) => {
  dispatch(fetchPatientRequest());
  return fetchWithAuth(`${baseUrl}/api/patient/get-patient/${id}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(fetchPatientSuccess(data));
    })
    .catch((err) => {
      dispatch(fetchPatientFailure(err.message));
    });
};

// Delete Patient
export const deletePatientById = (id) => (dispatch) => {
  dispatch(deletePatientRequest());
  return fetchWithAuth(`${baseUrl}/api/patient/delete-patient/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.text())
    .then((data) => {
      dispatch(deletePatientSuccess(id));
    })
    .catch((err) => {
      dispatch(deletePatientFailure(err.message));
    });
};

// Fetch All Patients (for select)
export const fetchAllPatients = () => (dispatch) => {
  dispatch(fetchAllPatientsRequest());
  return fetchWithAuth(`${baseUrl}/api/patient/get-all-search-patients`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(fetchAllPatientsSuccess(data));
    })
    .catch((err) => {
      dispatch(fetchAllPatientsFailure(err.message));
    });
};

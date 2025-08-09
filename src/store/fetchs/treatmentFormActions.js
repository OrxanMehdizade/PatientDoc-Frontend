import {
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
} from "../reducers/treatmentFormReducer";
import fetchWithAuth from "./fetchWithAuth";
import fetchBaseUrl from "./fetchBaseURL.json";

const baseUrl = fetchBaseUrl.API_BASE_URL;

// Fetch Treatment Forms
export const fetchTreatmentForms = () => (dispatch) => {
  dispatch(fetchTreatmentFormsRequest());
  return fetchWithAuth(`${baseUrl}/api/TreatmentForm/get-treatmentforms`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(fetchTreatmentFormsSuccess(data));
    })
    .catch((err) => {
      dispatch(fetchTreatmentFormsFailure(err.message));
    });
};

// Create Treatment Form
export const createTreatmentForm = (name) => (dispatch) => {
  dispatch(createTreatmentFormRequest());
  return fetchWithAuth(`${baseUrl}/api/TreatmentForm/create-treatmentform`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(createTreatmentFormSuccess(data));
      return data;
    })
    .catch((err) => {
      dispatch(createTreatmentFormFailure(err.message));
    });
};

// Update Treatment Form
export const updateTreatmentForm = (id, name, content) => (dispatch) => {
  dispatch(updateTreatmentFormRequest());
  return fetchWithAuth(`${baseUrl}/api/TreatmentForm/update-treatmentform/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, content }),
  })
    .then((response) => response.text())
    .then((data) => {
      dispatch(updateTreatmentFormSuccess(data));
    })
    .catch((err) => {
      dispatch(updateTreatmentFormFailure(err.message));
    });
};

// Delete Treatment Form
export const deleteTreatmentForm = (id) => (dispatch) => {
  dispatch(deleteTreatmentFormRequest());
  return fetchWithAuth(`${baseUrl}/api/TreatmentForm/delete-treatmentform/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.text())
    .then((data) => {
      dispatch(deleteTreatmentFormSuccess(data));
    })
    .catch((err) => {
      dispatch(deleteTreatmentFormFailure(err.message));
    });
};

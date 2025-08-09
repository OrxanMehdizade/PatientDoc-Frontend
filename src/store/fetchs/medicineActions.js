import {
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
} from "../reducers/medicineReducer";
import fetchWithAuth from "./fetchWithAuth";
import fetchBaseUrl from "./fetchBaseURL.json";

const baseUrl = fetchBaseUrl.API_BASE_URL;

// Fetch Medicines
export const fetchMedicines = () => (dispatch) => {
  dispatch(fetchMedicinesRequest());
  return fetchWithAuth(`${baseUrl}/api/Medicine/get-medicines`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(fetchMedicinesSuccess(data));
    })
    .catch((err) => {
      dispatch(fetchMedicinesFailure(err.message));
    });
};

// Create Medicine
export const createMedicine = (name) => (dispatch) => {
  dispatch(createMedicineRequest());
  return fetchWithAuth(`${baseUrl}/api/Medicine/create-medicine`, {
    method: "POST",
    body: JSON.stringify({ name }),
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(createMedicineSuccess(data));
      return data;
    })
    .catch((err) => {
      dispatch(createMedicineFailure(err.message));
    });
};

// Update Medicine
export const updateMedicine = (id, name) => (dispatch) => {
  dispatch(updateMedicineRequest());
  return fetchWithAuth(`${baseUrl}/api/Medicine/update-medicine/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name }),
  })
    .then((response) => response.text())
    .then((data) => {
      dispatch(updateMedicineSuccess(data));
    })
    .catch((err) => {
      dispatch(updateMedicineFailure(err.message));
    });
};

// Delete Medicine
export const deleteMedicine = (id) => (dispatch) => {
  dispatch(deleteMedicineRequest());
  return fetchWithAuth(`${baseUrl}/api/Medicine/delete-medicine/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.text())
    .then((data) => {
      dispatch(deleteMedicineSuccess(id));
    })
    .catch((err) => {
      dispatch(deleteMedicineFailure(err.message));
    });
};

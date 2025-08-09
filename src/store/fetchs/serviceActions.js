import {
  fetchServicesRequest,
  fetchServicesSuccess,
  fetchServicesFailure,
  createServiceRequest,
  createServiceSuccess,
  createServiceFailure,
  updateServiceRequest,
  updateServiceSuccess,
  updateServiceFailure,
  deleteServiceRequest,
  deleteServiceSuccess,
  deleteServiceFailure,
} from "../reducers/serviceReducer";
import fetchWithAuth from "./fetchWithAuth";
import fetchBaseUrl from "./fetchBaseURL.json";

const baseUrl = fetchBaseUrl.API_BASE_URL;

// Fetch Services
export const fetchServices = () => (dispatch) => {
  dispatch(fetchServicesRequest());
  return fetchWithAuth(`${baseUrl}/api/Service/get-services`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(fetchServicesSuccess(data));
    })
    .catch((err) => {
      dispatch(fetchServicesFailure(err.message));
    });
};

// Create Service
export const createService = (name) => (dispatch) => {
  dispatch(createServiceRequest());
  return fetchWithAuth(`${baseUrl}/api/Service/create-service`, {
    method: "POST",
    body: JSON.stringify({ name }),
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(createServiceSuccess(data));
      return data;
    })
    .catch((err) => {
      dispatch(createServiceFailure(err.message));
    });
};

// Update Service
export const updateService = (id, name) => (dispatch) => {
  dispatch(updateServiceRequest());
  return fetchWithAuth(`${baseUrl}/api/Service/update-service/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name }),
  })
    .then((response) => response.text())
    .then((data) => {
      dispatch(updateServiceSuccess(data));
    })
    .catch((err) => {
      dispatch(updateServiceFailure(err.message));
    });
};

// Delete Service
export const deleteService = (id) => (dispatch) => {
  dispatch(deleteServiceRequest());
  return fetchWithAuth(`${baseUrl}/api/Service/delete-service/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.text())
    .then((data) => {
      dispatch(deleteServiceSuccess(id));
    })
    .catch((err) => {
      dispatch(deleteServiceFailure(err.message));
    });
};

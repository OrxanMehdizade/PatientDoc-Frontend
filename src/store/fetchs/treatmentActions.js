import {
  createTreatmentRequest,
  createTreatmentSuccess,
  fetchTreatmentsRequest,
  fetchTreatmentsSuccess,
  fetchTreatmentsFailure,
  fetchTreatmentRequest,
  fetchTreatmentSuccess,
  fetchTreatmentFailure,
  deleteTreatmentRequest,
  deleteTreatmentSuccess,
  deleteTreatmentFailure,
  fetchAllTreatmentsRequest,
  fetchAllTreatmentsSuccess,
  fetchAllTreatmentsFailure,
  updateTreatmentRequest,
  updateTreatmentSuccess,
  updateTreatmentFailure,
} from "../reducers/treatmentReducer";
import fetchWithAuth from "./fetchWithAuth";
import fetchBaseUrl from "./fetchBaseURL.json";

const baseUrl = fetchBaseUrl.API_BASE_URL;

// Create Treatment
export const createTreatmentFetch = (treatmentData) => (dispatch) => {
  dispatch(createTreatmentRequest());
  return fetchWithAuth(`${baseUrl}/api/treatment/create-treatment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(treatmentData),
  })
    .then((response) => response.text())
    .then((data) => {
      dispatch(createTreatmentSuccess(data));
    });
};

// Fetch Treatments
export const fetchTreatments =
  (page = 1, pageSize = 5) =>
  (dispatch) => {
    dispatch(fetchTreatmentsRequest());
    return fetchWithAuth(
      `${baseUrl}/api/treatment/get-treatments?page=${page}&pagesize=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchTreatmentsSuccess(data));
      })
      .catch((err) => {
        dispatch(fetchTreatmentsFailure(err.message));
      });
  };

// Fetch Single Treatment by ID
export const fetchTreatmentById = (id) => (dispatch) => {
  dispatch(fetchTreatmentRequest());
  return fetchWithAuth(`${baseUrl}/api/treatment/get-treatment/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(fetchTreatmentSuccess(data));
    })
    .catch((err) => {
      dispatch(fetchTreatmentFailure(err.message));
    });
};

// Delete Treatment
export const deleteTreatmentById = (id) => (dispatch) => {
  dispatch(deleteTreatmentRequest());
  console.log(`${baseUrl}/api/treatment/delete-treatment/${id}`);
  return fetchWithAuth(`${baseUrl}/api/treatment/delete-treatment/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.text())
    .then((data) => {
      dispatch(deleteTreatmentSuccess(id));
    })
    .catch((err) => {
      dispatch(deleteTreatmentFailure(err.message));
    });
};

// Fetch All Treatments (for select)
export const fetchAllTreatments = () => (dispatch) => {
  dispatch(fetchAllTreatmentsRequest());
  return fetchWithAuth(`${baseUrl}/api/treatment/get-all-treatments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(fetchAllTreatmentsSuccess(data));
    })
    .catch((err) => {
      dispatch(fetchAllTreatmentsFailure(err.message));
    });
};

// Update Treatment
export const updateTreatment = (id, treatmentData) => (dispatch) => {
  dispatch(updateTreatmentRequest());
  return fetchWithAuth(`${baseUrl}/api/treatment/update-treatment/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(treatmentData),
  })
    .then((response) => response.text())
    .then((data) => {
      dispatch(updateTreatmentSuccess(data));
    })
    .catch((err) => {
      dispatch(updateTreatmentFailure(err.message));
    });
};

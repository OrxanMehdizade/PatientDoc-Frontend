import {
  createAppointmentRequest,
  createAppointmentSuccess,
  fetchAppointmentsRequest,
  fetchAppointmentsSuccess,
  fetchAppointmentsFailure,
  fetchAppointmentRequest,
  fetchAppointmentSuccess,
  fetchAppointmentFailure,
  updateAppointmentRequest,
  updateAppointmentSuccess,
  updateAppointmentFailure,
  deleteAppointmentRequest,
  deleteAppointmentSuccess,
  deleteAppointmentFailure,
  markAppointmentAsFinishedRequest,
  markAppointmentAsFinishedSuccess,
  markAppointmentAsFinishedFailure,
  cancelAppointmentRequest,
  cancelAppointmentSuccess,
  cancelAppointmentFailure,
  setAppointmentDurationRequest,
  setAppointmentDurationSuccess,
  setAppointmentDurationFailure,
  getAppointmentDurationRequest,
  getAppointmentDurationSuccess,
  getAppointmentDurationFailure,
  fetchAppointmentsByDateSuccess,
  fetchAppointmentsByDateFailure,
  fetchAppointmentsByDateRequest,
  fetchAllAppointmentDatesRequest,
  fetchAllAppointmentDatesSuccess,
  fetchAllAppointmentDatesFailure,
  fetchAllAppointmentCalendarRequest,
  fetchAllAppointmentCalendarSuccess,
  fetchAllAppointmentCalendarFailure,
} from "../reducers/appointmentReducer";
import fetchWithAuth from "./fetchWithAuth";
import fetchBaseUrl from "./fetchBaseURL.json";

const baseUrl = fetchBaseUrl.API_BASE_URL;

// Fetch Appointments by Date
export const fetchAppointmentsByDate = (date) => (dispatch) => {
  dispatch(fetchAppointmentsByDateRequest());
  return fetchWithAuth(
    `${baseUrl}/api/Appointment/get-appointments-by-date?date=${date}`
  )
    .then((response) => response.json())
    .then((data) => {
      dispatch(fetchAppointmentsByDateSuccess(data));
    })
    .catch((err) => {
      dispatch(fetchAppointmentsByDateFailure(err.message));
    });
};

// Fetch All Appointment Dates
export const fetchAllAppointmentDates = () => (dispatch) => {
  dispatch(fetchAllAppointmentDatesRequest());
  return fetchWithAuth(`${baseUrl}/api/Appointment/get-all-appointment-dates`)
    .then((response) => response.json())
    .then((data) => {
      dispatch(
        fetchAllAppointmentDatesSuccess(
          data.map((date) => new Date(date).toISOString())
        )
      );
    })
    .catch((err) => {
      dispatch(fetchAllAppointmentDatesFailure(err.message));
    });
};

// Fetch All Appointment Calendar
export const fetchAllAppointmentCalendar = () => (dispatch) => {
  dispatch(fetchAllAppointmentCalendarRequest());
  return fetchWithAuth(`${baseUrl}/api/Appointment/get-appointments-calendar`)
    .then((response) => response.json())
    .then((data) => {
      dispatch(fetchAllAppointmentCalendarSuccess(data));
    })
    .catch((err) => {
      dispatch(fetchAllAppointmentCalendarFailure(err.message));
    });
};

// Fetch Appointments Pagination
export const fetchAppointments =
  (page = 1, pageSize = 10) =>
  (dispatch) => {
    dispatch(fetchAppointmentsRequest());
    return fetchWithAuth(
      `${baseUrl}/api/Appointment/get-appointments?page=${page}&pageSize=${pageSize}`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchAppointmentsSuccess(data));
      })
      .catch((err) => {
        dispatch(fetchAppointmentsFailure(err.message));
      });
  };

// Fetch Single Appointment by ID
export const fetchAppointmentById = (id) => (dispatch) => {
  dispatch(fetchAppointmentRequest());
  return fetchWithAuth(`${baseUrl}/api/Appointment/get-appointment/${id}`)
    .then((response) => response.json())
    .then((data) => {
      dispatch(fetchAppointmentSuccess(data));
    })
    .catch((err) => {
      dispatch(fetchAppointmentFailure(err.message));
    });
};

export const createAppointment = (appointmentData) => (dispatch) => {
  dispatch(createAppointmentRequest());
  return fetchWithAuth(`${baseUrl}/api/Appointment/create-appointment`, {
    method: "POST",
    body: JSON.stringify(appointmentData),
  })
    .then((response) => response.text())
    .then((data) => {
      dispatch(createAppointmentSuccess(data));
    });
};

// Update Appointment
export const updateAppointment = (id, appointmentData) => (dispatch) => {
  dispatch(updateAppointmentRequest());
  return fetchWithAuth(`${baseUrl}/api/Appointment/update-appointment/${id}`, {
    method: "PUT",
    body: JSON.stringify(appointmentData),
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(updateAppointmentSuccess(data));
    })
    .catch((err) => {
      dispatch(updateAppointmentFailure(err.message));
    });
};

// Delete Appointment
export const deleteAppointment = (id) => (dispatch) => {
  dispatch(deleteAppointmentRequest());
  return fetchWithAuth(`${baseUrl}/api/Appointment/delete-appointment/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.text())
    .then(() => {
      dispatch(deleteAppointmentSuccess(id));
    })
    .catch((err) => {
      dispatch(deleteAppointmentFailure(err.message));
    });
};

// Mark Appointment as Finished
export const markAppointmentAsFinished = (id) => (dispatch) => {
  dispatch(markAppointmentAsFinishedRequest());
  return fetchWithAuth(
    `${baseUrl}/api/Appointment/mark-appointment-as-finished/${id}`,
    {
      method: "PUT",
    }
  )
    .then((response) => response.json())
    .then(() => {
      dispatch(markAppointmentAsFinishedSuccess(id));
    })
    .catch((err) => {
      dispatch(markAppointmentAsFinishedFailure(err.message));
    });
};

// Cancel Appointment
export const cancelAppointment = (id) => (dispatch) => {
  dispatch(cancelAppointmentRequest());
  return fetchWithAuth(`${baseUrl}/api/Appointment/cancel-appointment/${id}`, {
    method: "PUT",
  })
    .then((response) => response.json())
    .then(() => {
      dispatch(cancelAppointmentSuccess(id));
    })
    .catch((err) => {
      dispatch(cancelAppointmentFailure(err.message));
    });
};

// Set Appointment Duration
export const setAppointmentDuration = (time) => (dispatch) => {
  dispatch(setAppointmentDurationRequest());
  return fetchWithAuth(`${baseUrl}/api/Appointment/set-appointment-duration`, {
    method: "PUT",
    body: JSON.stringify(time),
  })
    .then((response) => response.json())
    .then(() => {
      dispatch(setAppointmentDurationSuccess(time));
    })
    .catch((err) => {
      dispatch(setAppointmentDurationFailure(err.message));
    });
};

// Get Appointment Duration
export const getAppointmentDuration = () => (dispatch) => {
  dispatch(getAppointmentDurationRequest());
  return fetchWithAuth(`${baseUrl}/api/Appointment/get-appointment-duration`)
    .then((response) => response.text())
    .then((data) => {
      dispatch(getAppointmentDurationSuccess(data));
      return data;
    })
    .catch((err) => {
      dispatch(getAppointmentDurationFailure(err.message));
    });
};

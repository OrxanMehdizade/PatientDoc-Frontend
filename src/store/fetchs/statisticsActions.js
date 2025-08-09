import {
  fetchGeneralStatisticsRequest,
  fetchGeneralStatisticsSuccess,
  fetchGeneralStatisticsFailure,
  fetchAppealStatisticsRequest,
  fetchAppealStatisticsSuccess,
  fetchAppealStatisticsFailure,
} from "../reducers/statisticsReducer";
import fetchWithAuth from "./fetchWithAuth";
import fetchBaseUrl from "./fetchBaseURL.json";

const baseUrl = fetchBaseUrl.API_BASE_URL;

const formatDate = (date) => {
  if (!date) return "";
  return date;
};

// Fetch General Statistics
export const fetchGeneralStatistics =
  ({ startDate, endDate }) =>
  (dispatch) => {
    dispatch(fetchGeneralStatisticsRequest());
    return fetchWithAuth(
      `${baseUrl}/api/Statistics/get-general-statistics?startDate=${formatDate(
        startDate
      )}&endDate=${formatDate(endDate)}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchGeneralStatisticsSuccess(data));
      })
      .catch((err) => {
        dispatch(fetchGeneralStatisticsFailure(err.message));
      });
  };

// Fetch Appeal Statistics
export const fetchAppealStatistics =
  ({ startDate, endDate }) =>
  (dispatch) => {
    dispatch(fetchAppealStatisticsRequest());
    return fetchWithAuth(
      `${baseUrl}/api/Statistics/get-patients-come-from?startDate=${formatDate(
        startDate
      )}&endDate=${formatDate(endDate)}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchAppealStatisticsSuccess(data));
      })
      .catch((err) => {
        dispatch(fetchAppealStatisticsFailure(err.message));
      });
  };

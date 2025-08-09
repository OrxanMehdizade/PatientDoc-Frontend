import store from "../store";
import { refreshTokenFetch, logoutUser } from "./authActions";

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (accessToken) => {
  refreshSubscribers.forEach((callback) => callback(accessToken));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

const fetchWithAuth = async (url, options = {}) => {
  let accessToken = localStorage.getItem("accessToken");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  let response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const data = await store.dispatch(refreshTokenFetch());
        accessToken = data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        isRefreshing = false;
        onRefreshed(accessToken);
      } catch (error) {
        isRefreshing = false;
        store.dispatch(logoutUser());
        throw error;
      }
    }

    const retryOriginalRequest = new Promise((resolve) => {
      addRefreshSubscriber((accessToken) => {
        resolve(fetch(url, {
          ...options,
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          },
        }));
      });
    });

    response = await retryOriginalRequest;
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  return response;
};

export default fetchWithAuth;

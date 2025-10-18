import axios from "axios";

import { SITE_CONFIG } from "../configs/site.config";
import { getAccessToken } from "./local-storage";

const token = getAccessToken();
// const _refreshToken = getRefreshToken();

const axiosInstance = axios.create({
  baseURL: `${SITE_CONFIG.BACKEND_URL}`,
  headers: {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // if error is 401 (Unauthorized) and not retry
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        throw new Error("Refresh token failed");
      } catch {
        //
      }
    }
    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong!"
    );
  }
);

export default axiosInstance;

import axios from "axios";
import {  API_URL } from "../constants/app.constants";
import { useAuthStore } from "~/shared/stores/auth.store";
import { ROUTES } from "../routes/app.routes";
import { refreshToken } from "~/shared/api";

declare module "axios" {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;
    const authStore = useAuthStore();

    if (error?.response?.status === 401 && !config?._retry) {
      config._retry = true;

      try {
        const response = await refreshToken();
        const result = response.data;

        authStore.setToken(result.accessToken);

        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result.accessToken}`,
        };

        return api(config);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        authStore.logout();

        if (window.location.pathname !== ROUTES.AUTH) {
          window.location.href = ROUTES.AUTH;
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

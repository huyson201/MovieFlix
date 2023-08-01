import axios, { AxiosResponse } from "axios";
import authServices from "./auth/auth.services";
import { STORE_TOKEN_KEY } from "../../constants";

declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const storedTokens = localStorage.getItem("tokens");
    if (!storedTokens || !JSON.parse(storedTokens)) return config;

    const tokens = JSON.parse(storedTokens) as {
      access_token: string;
      refresh_token: string;
    };

    config.headers.Authorization = `Bearer ${tokens.access_token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const excludeRefreshTokenEndPoint = [
  `${BASE_URL}/auth/refresh-token`,
  `${BASE_URL}/auth/login`,
  `${BASE_URL}/auth/register`,
];

let refreshTokenRequest: null | Promise<
  AxiosResponse<{ access_token: string; refresh_token: string }, any>
> = null;

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) return Promise.reject(error);
    let { status, config } = error.response;
    if (
      status &&
      status === 401 &&
      !config._retry &&
      !excludeRefreshTokenEndPoint.includes(`${BASE_URL}/${config.url}`)
    ) {
      refreshTokenRequest =
        refreshTokenRequest !== null
          ? refreshTokenRequest
          : authServices.refreshToken();
      config._retry = true;

      if (refreshTokenRequest === null) {
        return Promise.reject(error);
      }
      return refreshTokenRequest.then((response) => {
        refreshTokenRequest = null;
        const tokens = response.data;
        localStorage.setItem(STORE_TOKEN_KEY, JSON.stringify(tokens));
        config.headers.Authorization = `Bearer ${tokens.access_token}`;

        return axiosClient(config);
      });
    }
    return Promise.reject(error);
  }
);

export default axiosClient;

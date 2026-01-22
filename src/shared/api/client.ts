import axios from "axios";

import { BASE_URL, REQUEST_TIMEOUT_MS } from "./config";
import {
  authTokenRequestInterceptor,
  createResponseErrorInterceptor,
  responseSuccessInterceptor,
} from "./interceptors";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(authTokenRequestInterceptor);
apiClient.interceptors.response.use(
  responseSuccessInterceptor,
  createResponseErrorInterceptor(apiClient),
);

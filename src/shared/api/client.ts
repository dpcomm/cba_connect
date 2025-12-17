import axios from 'axios';

import {
  authTokenRequestInterceptor,
  responseErrorInterceptor,
  responseSuccessInterceptor,
} from './interceptors';

const PRODUCT_URI = process.env.EXPO_PUBLIC_PRODUCT_URI || 'https://recba.me';
const LOCAL_URI = process.env.EXPO_PUBLIC_LOCAL_URI || 'http://localhost:3000';
const BASE_URL = PRODUCT_URI || LOCAL_URI;
const REQUEST_TIMEOUT_MS = 5000;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(authTokenRequestInterceptor);
apiClient.interceptors.response.use(responseSuccessInterceptor, responseErrorInterceptor);

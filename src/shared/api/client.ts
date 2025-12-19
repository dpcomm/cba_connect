import axios from 'axios';

import {
  authTokenRequestInterceptor,
  createResponseErrorInterceptor,
  responseSuccessInterceptor,
} from './interceptors';

const PRODUCT_URI = process.env.EXPO_PUBLIC_PRODUCT_URI || 'https://recba.me';
const LOCAL_URI = process.env.EXPO_PUBLIC_LOCAL_URI || 'https://dev.recba.me';

// 개발 모드면 LOCAL_URI, 배포 모드면 PRODUCT_URI 사용
const BASE_URL = __DEV__ ? LOCAL_URI : PRODUCT_URI;
const REQUEST_TIMEOUT_MS = 5000;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(authTokenRequestInterceptor);
apiClient.interceptors.response.use(
  responseSuccessInterceptor,
  createResponseErrorInterceptor(apiClient)
);

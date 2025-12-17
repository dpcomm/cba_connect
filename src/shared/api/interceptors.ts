import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';

export async function authTokenRequestInterceptor(
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> {
  const accessToken = await SecureStore.getItemAsync('access_token');

  if (accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
}

export function responseSuccessInterceptor<T>(response: AxiosResponse<T>): AxiosResponse<T> {
  return response;
}

export function responseErrorInterceptor(
  error: AxiosError<{ message?: string }>
): Promise<never> {
  if (error.response?.data?.message) {
    error.message = error.response.data.message;
  }

  return Promise.reject(error);
}

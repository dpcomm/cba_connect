export const PRODUCT_URI =
  process.env.EXPO_PUBLIC_PRODUCT_URI || "https://recba.me";
export const LOCAL_URI =
  process.env.EXPO_PUBLIC_LOCAL_URI || "https://dev.recba.me";

export const BASE_URL = __DEV__ ? LOCAL_URI : PRODUCT_URI;
export const REQUEST_TIMEOUT_MS = 5000;

/**
 * API Path Prefix Configuration
 * Production (Release Build) -> /api/v2
 * Development (Debug Build) -> /api
 */
export const API_PREFIX = !__DEV__ ? "/api/v2" : "/api";

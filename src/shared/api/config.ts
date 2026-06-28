// Production/Dev URI
const PRODUCT_URI = "https://api.recba.me";
const LOCAL_URI = "https://api.dev.recba.me";

// Determine Environment
export const BASE_URL = __DEV__ ? LOCAL_URI : PRODUCT_URI;

export const REQUEST_TIMEOUT_MS = 5000;

/**
 * API Path Prefix Configuration
 * 서버는 global prefix 없이 라우트를 서빙합니다 (예: /auth/login).
 */
export const API_PREFIX = "";

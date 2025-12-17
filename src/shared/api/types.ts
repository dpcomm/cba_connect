export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: boolean;
  statusCode: number;
  message: string;
  error: {
    code: string;
    details: string;
  };
}

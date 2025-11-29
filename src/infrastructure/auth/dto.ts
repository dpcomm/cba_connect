export interface LoginRequestDto {
  userId: string;
  password?: string;
  autoLogin?: boolean;
}

export interface LoginResponseDto {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: string;
    userId: string;
    name: string;
    group: string;
    phone: string;
    birth: string;
    gender: string;
    rank?: string;
  };
}

export interface ApiResponse<T> {
  message?: string;
  data: T;
}

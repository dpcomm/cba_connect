export interface LoginRequestDto {
  userId: string;
  password: string;
  autoLogin: boolean;
}

export interface RegisterRequestDto {
  userId: string;
  password: string;
  name: string;
  group: string;
  phone: string;
  birth: string;
  gender: string;
  rank: string;
}

export interface RefreshRequestDto {
  refreshToken: string;
}

export interface AuthResponseDto {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    rank: string;
    userId: string;
    name: string;
    group: string;
    phone: string;
    birth: string;
    gender: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

// Alias for backward compatibility if needed, or clear intent
export type LoginResponseDto = AuthResponseDto;
export type RegisterResponseDto = AuthResponseDto;
export type RefreshResponseDto = AuthResponseDto;



import { UserResponseDto } from '../user/dto';

export interface LoginRequestDto {
  userId: string;
  password: string;
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

export interface AuthResponseDto {
  access_token: string;
  refresh_token: string;
  user: UserResponseDto;
}


export interface RefreshResponseDto {
  access_token: string;
}




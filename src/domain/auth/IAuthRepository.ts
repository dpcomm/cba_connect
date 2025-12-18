import { Auth } from './Auth';

export interface RegisterData {
  userId: string;
  password: string;
  name: string;
  group: string;
  phone: string;
  birth: string;
  gender: string;
  rank: string;
}

export interface IAuthRepository {
  login(userId: string, password: string): Promise<Auth>;
  register(data: RegisterData): Promise<Auth>;
  logout(): Promise<void>;
  refreshAccessToken(): Promise<string>;
  
  setAutoLoginEnabled(enabled: boolean): Promise<void>;
  getAutoLoginEnabled(): Promise<boolean>;
  getStoredRefreshToken(): Promise<string | null>;
}



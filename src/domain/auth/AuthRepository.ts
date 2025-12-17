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

export interface AuthRepository {
  login(userId: string, password: string, autoLogin: boolean): Promise<Auth>;
  register(data: RegisterData): Promise<Auth>;
  logout(): Promise<void>;
  refresh(refreshToken: string): Promise<Auth>;
}


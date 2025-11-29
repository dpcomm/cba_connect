import { Auth } from './Auth';

export interface AuthRepository {
  login(userId: string, password: string, autoLogin: boolean): Promise<Auth>;
  logout(): Promise<void>;
  refresh(refreshToken: string): Promise<Auth>;
}

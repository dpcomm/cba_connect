import { Auth } from './Auth';
import { EmailVerificationType } from './EmailVerificationType';

export interface RegisterData {
  userId: string;
  password: string;
  name: string;
  group: string;
  phone: string;
  email: string;
  verificationToken: string;
  birth: string;
  gender: string;
  rank: string;
}

export interface ResetPasswordData {
  email: string;
  verificationToken: string;
  newPassword: string;
}

export interface IAuthRepository {
  login(userId: string, password: string): Promise<Auth>;
  register(data: RegisterData): Promise<Auth>;
  logout(): Promise<void>;
  refreshAccessToken(): Promise<string>;

  setAutoLoginEnabled(enabled: boolean): Promise<void>;
  getAutoLoginEnabled(): Promise<boolean>;
  getStoredRefreshToken(): Promise<string | null>;

  sendEmailVerification(email: string, type: EmailVerificationType, userId?: string): Promise<void>;
  verifyEmailCode(email: string, code: string): Promise<string>;

  checkIdDuplicate(id: string): Promise<boolean>;
  findId(name: string, phone: string): Promise<string[]>;
  resetPassword(data: ResetPasswordData): Promise<void>;
}



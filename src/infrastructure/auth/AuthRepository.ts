import { Auth } from '@domain/auth/Auth';
import { IAuthRepository, RegisterData } from '@domain/auth/IAuthRepository';
import { User } from '@domain/user/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from '@shared/api/client';
import { ApiErrorResponse, ApiResponse } from '@shared/api/types';
import { isAxiosError } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { injectable } from 'tsyringe';

import {
  AuthResponseDto,
  LoginRequestDto,
  RefreshResponseDto,
  RegisterRequestDto
} from './dto';

const AUTO_LOGIN_KEY = 'auto_login_enabled';

@injectable()
export class AuthRepository implements IAuthRepository {
  async login(userId: string, password: string): Promise<Auth> {
    try {
      const requestBody: LoginRequestDto = {
        userId,
        password,
      };

      const response = await apiClient.post<ApiResponse<AuthResponseDto>>('/api/auth/login', requestBody);
      const { data } = response.data;
      const auth = this.mapToAuth(data);

      await this.persistTokens(auth);

      return auth;
    } catch (error: any) {
      throw this.normalizeError(error);
    }
  }

  async register(data: RegisterData): Promise<Auth> {
    try {
      const requestBody: RegisterRequestDto = {
        ...data
      };

      const response = await apiClient.post<ApiResponse<AuthResponseDto>>('/api/auth/register', requestBody);
      const responseData = response.data.data;
      const auth = this.mapToAuth(responseData);

      await this.persistTokens(auth);

      return auth;
    } catch (error: any) {
      throw this.normalizeError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post<ApiResponse<void>>('/api/auth/logout');
    } catch (error) {
      console.warn('Logout API failed:', error);
    } finally {
      // 토큰 삭제
      await SecureStore.deleteItemAsync('access_token');
      await SecureStore.deleteItemAsync('refresh_token');
      // 자동 로그인 설정도 초기화
      await AsyncStorage.removeItem(AUTO_LOGIN_KEY);
    }
  }

  async refreshAccessToken(): Promise<string> {
    try {
      const refreshToken = await SecureStore.getItemAsync('refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await apiClient.post<ApiResponse<RefreshResponseDto>>(
        '/api/auth/refresh',
        {},
        { headers: { Authorization: `Bearer ${refreshToken}` } }
      );
      
      const newAccessToken = response.data.data.access_token;
      await SecureStore.setItemAsync('access_token', newAccessToken);
      
      return newAccessToken;
    } catch (error: any) {
      throw this.normalizeError(error);
    }
  }

  async setAutoLoginEnabled(enabled: boolean): Promise<void> {
    if (enabled) {
      await AsyncStorage.setItem(AUTO_LOGIN_KEY, 'true');
    } else {
      await AsyncStorage.removeItem(AUTO_LOGIN_KEY);
    }
  }

  async getAutoLoginEnabled(): Promise<boolean> {
    const value = await AsyncStorage.getItem(AUTO_LOGIN_KEY);
    return value === 'true';
  }

  async getStoredRefreshToken(): Promise<string | null> {
    return SecureStore.getItemAsync('refresh_token');
  }

  /** AuthResponseDto -> Auth */
  private mapToAuth(data: AuthResponseDto): Auth {
    const user = new User(
      data.user.id,
      data.user.userId,
      data.user.name,
      data.user.group,
      data.user.phone,
      data.user.birth,
      data.user.gender,
      data.user.rank,
      data.user.isDeleted,
      data.user.createdAt,
      data.user.updatedAt
    );

    return new Auth(
      data.access_token,
      data.refresh_token,
      user
    );
  }

  /** 토큰 저장 */
  private async persistTokens(auth: Auth): Promise<void> {
    await SecureStore.setItemAsync('access_token', auth.accessToken);
    await SecureStore.setItemAsync('refresh_token', auth.refreshToken);
  }

  /** 에러 정규화 */
  private normalizeError(error: unknown): Error {
    if (isAxiosError<ApiErrorResponse>(error)) {
      const responseData = error.response?.data;
      const message = responseData?.message || error.message || '요청 중 오류가 발생했습니다.';
      
      const statusCode = error.response?.status;
      
      if (statusCode === 400) {
        if (message === 'User already exists') return new Error('이미 존재하는 사용자입니다.');
        return new Error(message || '잘못된 요청입니다.');
      }
      if (statusCode === 401) {
        return new Error('인증에 실패했습니다.');
      }
      if (statusCode === 404) {
        return new Error('존재하지 않는 사용자입니다.');
      }
      
      return new Error(message);
    }

    return error instanceof Error ? error : new Error('알 수 없는 오류가 발생했습니다.');
  }
}

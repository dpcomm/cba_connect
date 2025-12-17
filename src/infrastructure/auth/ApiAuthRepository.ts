import { Auth } from '@domain/auth/Auth';
import { AuthRepository, RegisterData } from '@domain/auth/AuthRepository';
import { apiClient } from '@shared/api/client';
import { ApiErrorResponse, ApiResponse } from '@shared/api/types';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { injectable } from 'tsyringe';

import {
  AuthResponseDto,
  LoginRequestDto,
  RefreshRequestDto,
  RegisterRequestDto
} from './dto';

@injectable()
export class ApiAuthRepository implements AuthRepository {
  async login(userId: string, password: string, autoLogin: boolean): Promise<Auth> {
    try {
      const requestBody: LoginRequestDto = {
        userId,
        password,
        autoLogin,
      };

      const response = await apiClient.post<ApiResponse<AuthResponseDto>>('/api/auth/login', requestBody);
      const { data } = response.data;
      const auth = this.mapToAuth(data);

      await this.persistTokens(auth, autoLogin);

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

      // 회원가입 후 자동 로그인 처리 (토큰 저장)
      await this.persistTokens(auth, false);

      return auth;
    } catch (error: any) {
      throw this.normalizeError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post<ApiResponse<void>>('/api/auth/logout');
    } catch (error) {
      // 로그아웃 API 실패해도 로컬 토큰은 삭제해야 함
      console.warn('Logout API failed:', error);
    } finally {
      await SecureStore.deleteItemAsync('access_token');
      await SecureStore.deleteItemAsync('refresh_token');
    }
  }

  async refresh(refreshToken: string): Promise<Auth> {
    try {
      const requestBody: RefreshRequestDto = {
        refreshToken
      };

      const response = await apiClient.post<ApiResponse<AuthResponseDto>>('/api/auth/refresh', requestBody);
      const { data } = response.data;
      const auth = this.mapToAuth(data);

      await this.persistTokens(auth, true);

      return auth;
    } catch (error: any) {
      throw this.normalizeError(error);
    }
  }

  private mapToAuth(data: AuthResponseDto): Auth {
    return new Auth(
      data.access_token,
      data.refresh_token,
      data.user
    );
  }

  private async persistTokens(auth: Auth, autoLogin: boolean): Promise<void> {
    await SecureStore.setItemAsync('access_token', auth.accessToken);

    if (autoLogin && auth.refreshToken) {
      await SecureStore.setItemAsync('refresh_token', auth.refreshToken);
      return;
    }

    await SecureStore.deleteItemAsync('refresh_token');
  }

  private normalizeError(error: unknown): Error {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      const responseData = error.response?.data;
      const message = responseData?.message || error.message || '요청 중 오류가 발생했습니다.';
      
      const statusCode = error.response?.status;
      
      if (statusCode === 400) {
        if (message.includes('exists')) return new Error('이미 존재하는 사용자입니다.');
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


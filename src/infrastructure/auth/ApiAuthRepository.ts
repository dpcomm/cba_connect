import { Auth } from '@domain/auth/Auth';
import { AuthRepository } from '@domain/auth/AuthRepository';
import { apiClient } from '@infrastructure/api/client';
import type { AxiosError } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { injectable } from 'tsyringe';

import { ApiResponse, LoginRequestDto, LoginResponseDto } from './dto';

@injectable()
export class ApiAuthRepository implements AuthRepository {
  async login(userId: string, password: string, autoLogin: boolean): Promise<Auth> {
    try {
      const requestBody: LoginRequestDto = {
        userId,
        password,
        autoLogin,
      };

      const response = await apiClient.post<ApiResponse<LoginResponseDto>>('/api/user/login', requestBody);
      const payload = this.resolvePayload(response.data);
      const auth = this.mapToAuth(payload);

      await this.persistTokens(auth, autoLogin);

      return auth;
    } catch (error: any) {
      throw this.normalizeError(error);
    }
  }

  async logout(): Promise<void> {
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');
  }

  async refresh(refreshToken: string): Promise<Auth> {
    throw new Error('Not implemented');
  }

  private resolvePayload(apiResponse: ApiResponse<LoginResponseDto> | LoginResponseDto): LoginResponseDto {
    if ('data' in apiResponse && apiResponse.data) {
      return apiResponse.data;
    }

    if ('accessToken' in apiResponse) {
      return apiResponse;
    }

    throw new Error('서버 응답에 로그인 데이터가 없습니다.');
  }

  private mapToAuth(data: LoginResponseDto): Auth {
    return new Auth(
      data.accessToken,
      data.refreshToken || '',
      {
        id: data.user.id,
        userId: data.user.userId,
        name: data.user.name,
        group: data.user.group,
        phone: data.user.phone,
        birth: data.user.birth,
        gender: data.user.gender,
      }
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
    if (this.isAxiosError(error)) {
      const message =
        error.response?.data?.message || error.message || '로그인 요청 중 오류가 발생했습니다.';
      return new Error(message);
    }

    return error instanceof Error ? error : new Error('알 수 없는 오류가 발생했습니다.');
  }

  private isAxiosError(error: unknown): error is AxiosError<{ message?: string }> {
    return (
      typeof error === 'object' &&
      error !== null &&
      'isAxiosError' in error &&
      Boolean((error as { isAxiosError?: boolean }).isAxiosError)
    );
  }
}

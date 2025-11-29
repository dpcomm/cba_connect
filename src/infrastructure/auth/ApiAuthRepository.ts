import { Auth } from '@domain/auth/Auth';
import { AuthRepository } from '@domain/auth/AuthRepository';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { ApiResponse, LoginRequestDto, LoginResponseDto } from './dto';

const BASE_URL = 'https://cba-connect-api.example.com'; // TODO: Replace with actual URL

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

import { injectable } from 'tsyringe';

@injectable()
export class ApiAuthRepository implements AuthRepository {
  async login(userId: string, password: string, autoLogin: boolean): Promise<Auth> {
    try {
      const requestBody: LoginRequestDto = {
        userId,
        password,
        autoLogin,
      };

      const response = await client.post<ApiResponse<LoginResponseDto>>('/api/user/login', requestBody);

      const data = response.data.data || (response.data as any); // Handle potential response structure variations
      
      const auth = new Auth(
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

      // Save tokens
      await SecureStore.setItemAsync('access_token', auth.accessToken);
      if (autoLogin && auth.refreshToken) {
        await SecureStore.setItemAsync('refresh_token', auth.refreshToken);
      }

      return auth;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }

  async logout(): Promise<void> {
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');
    // Call API if needed
  }

  async refresh(refreshToken: string): Promise<Auth> {
    // Implementation for refresh token
    throw new Error('Not implemented');
  }
}

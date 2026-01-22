import { Auth } from "@domain/auth/Auth";
import { EmailVerificationType } from "@domain/auth/EmailVerificationType";
import {
  IAuthRepository,
  RegisterData,
  ResetPasswordData,
} from "@domain/auth/IAuthRepository";
import { User } from "@domain/user/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiClient } from "@shared/api/client";
import { API_PREFIX } from "@shared/api/config";
import { ApiErrorResponse, ApiResponse } from "@shared/api/types";
import { isAxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { injectable } from "tsyringe";

import {
  AuthResponseDto,
  CheckIdResponseDto,
  FindIdRequestDto,
  FindIdResponseDto,
  LoginRequestDto,
  RefreshResponseDto,
  RegisterRequestDto,
  ResetPasswordRequestDto,
  VerifyEmailRequestDto,
  VerifyEmailResponseDto,
} from "./dto";

const AUTO_LOGIN_KEY = "auto_login_enabled";

@injectable()
export class AuthRepository implements IAuthRepository {
  async login(userId: string, password: string): Promise<Auth> {
    try {
      const requestBody: LoginRequestDto = {
        userId,
        password,
      };

      const response = await apiClient.post<ApiResponse<AuthResponseDto>>(
        `${API_PREFIX}/auth/login`,
        requestBody,
      );
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
        ...data,
      };

      const response = await apiClient.post<ApiResponse<AuthResponseDto>>(
        `${API_PREFIX}/auth/register`,
        requestBody,
      );
      const responseData = response.data.data;
      console.log(
        "Register Response Data:",
        JSON.stringify(responseData, null, 2),
      );

      if (responseData.access_token) {
        await SecureStore.setItemAsync(
          "access_token",
          responseData.access_token,
        );
      }
      if (responseData.refresh_token) {
        await SecureStore.setItemAsync(
          "refresh_token",
          responseData.refresh_token,
        );
      }

      // user 객체가 없는 경우 getMe로 사용자 정보 조회
      let user: User;
      if (responseData.user) {
        user = new User(
          responseData.user.id,
          responseData.user.userId,
          responseData.user.name,
          responseData.user.group,
          responseData.user.phone,
          responseData.user.birth,
          responseData.user.gender,
          responseData.user.rank,
          responseData.user.isDeleted,
          responseData.user.createdAt,
          responseData.user.updatedAt,
        );
      } else {
        const meResponse = await apiClient.get<ApiResponse<any>>(
          `${API_PREFIX}/users/me`,
        );
        const userData = meResponse.data.data;
        user = new User(
          userData.id,
          userData.userId,
          userData.name,
          userData.group,
          userData.phone,
          userData.birth,
          userData.gender,
          userData.rank,
          userData.isDeleted,
          userData.createdAt,
          userData.updatedAt,
        );
      }

      return new Auth(
        responseData.access_token,
        responseData.refresh_token,
        user,
      );
    } catch (error: any) {
      throw this.normalizeError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      const accessToken = await SecureStore.getItemAsync("access_token");
      if (accessToken) {
        await apiClient.post<ApiResponse<void>>(`${API_PREFIX}/auth/logout`);
      }
    } catch (error) {
      console.warn("Logout API failed:", error);
    } finally {
      await SecureStore.deleteItemAsync("access_token");
      await SecureStore.deleteItemAsync("refresh_token");
      await AsyncStorage.removeItem(AUTO_LOGIN_KEY);
    }
  }

  async refreshAccessToken(): Promise<string> {
    try {
      const refreshToken = await SecureStore.getItemAsync("refresh_token");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await apiClient.post<ApiResponse<RefreshResponseDto>>(
        `${API_PREFIX}/auth/refresh`,
        {},
        { headers: { Authorization: `Bearer ${refreshToken}` } },
      );

      const newAccessToken = response.data.data.access_token;
      await SecureStore.setItemAsync("access_token", newAccessToken);

      return newAccessToken;
    } catch (error: any) {
      throw this.normalizeError(error);
    }
  }

  async setAutoLoginEnabled(enabled: boolean): Promise<void> {
    if (enabled) {
      await AsyncStorage.setItem(AUTO_LOGIN_KEY, "true");
    } else {
      await AsyncStorage.removeItem(AUTO_LOGIN_KEY);
    }
  }

  async getAutoLoginEnabled(): Promise<boolean> {
    const value = await AsyncStorage.getItem(AUTO_LOGIN_KEY);
    return value === "true";
  }

  async getStoredRefreshToken(): Promise<string | null> {
    return SecureStore.getItemAsync("refresh_token");
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
      data.user.updatedAt,
    );

    return new Auth(data.access_token, data.refresh_token, user);
  }

  async sendEmailVerification(
    email: string,
    type: EmailVerificationType,
    userId?: string,
  ): Promise<void> {
    try {
      let url = `${API_PREFIX}/auth/email/${encodeURIComponent(email)}?type=${type}`;
      if (userId) {
        url += `&userId=${encodeURIComponent(userId)}`;
      }
      await apiClient.get<ApiResponse<void>>(url);
    } catch (error: any) {
      throw this.normalizeError(error);
    }
  }

  async verifyEmailCode(email: string, code: string): Promise<string> {
    try {
      const requestBody: VerifyEmailRequestDto = { email, code };
      const response = await apiClient.post<
        ApiResponse<VerifyEmailResponseDto>
      >(`${API_PREFIX}/auth/email/verify`, requestBody);
      return response.data.data.verificationToken;
    } catch (error: any) {
      throw this.normalizeError(error);
    }
  }

  async checkIdDuplicate(id: string): Promise<boolean> {
    try {
      const response = await apiClient.get<ApiResponse<CheckIdResponseDto>>(
        `${API_PREFIX}/auth/check-id/${encodeURIComponent(id)}`,
      );
      return response.data.data.isDuplicate;
    } catch (error: any) {
      throw this.normalizeError(error);
    }
  }

  async findId(name: string, phone: string): Promise<string[]> {
    try {
      const requestBody: FindIdRequestDto = { name, phone };
      const response = await apiClient.post<ApiResponse<FindIdResponseDto>>(
        `${API_PREFIX}/auth/find-id`,
        requestBody,
      );
      return response.data.data.userIds;
    } catch (error: any) {
      throw this.normalizeError(error);
    }
  }

  async resetPassword(data: ResetPasswordData): Promise<void> {
    try {
      const requestBody: ResetPasswordRequestDto = {
        email: data.email,
        verificationToken: data.verificationToken,
        newPassword: data.newPassword,
      };
      await apiClient.post<ApiResponse<void>>(
        `${API_PREFIX}/auth/reset-password`,
        requestBody,
      );
    } catch (error: any) {
      throw this.normalizeError(error);
    }
  }

  /** 토큰 저장 */
  private async persistTokens(auth: Auth): Promise<void> {
    await SecureStore.setItemAsync("access_token", auth.accessToken);
    await SecureStore.setItemAsync("refresh_token", auth.refreshToken);
  }

  /** 에러 정규화 */
  private normalizeError(error: unknown): Error {
    if (isAxiosError<ApiErrorResponse>(error)) {
      const responseData = error.response?.data;
      const message =
        responseData?.message ||
        error.message ||
        "요청 중 오류가 발생했습니다.";

      const statusCode = error.response?.status;

      if (statusCode === 400) {
        if (message === "User already exists")
          return new Error("이미 존재하는 사용자입니다.");
        if (message === "Email already exists")
          return new Error("이미 등록된 이메일입니다.");
        if (message === "Email not registered")
          return new Error("등록되지 않은 이메일입니다.");
        if (
          message === "User email mismatch" ||
          message === "User ID and email do not match"
        )
          return new Error("아이디와 이메일 정보가 일치하지 않습니다.");
        return new Error(message || "잘못된 요청입니다.");
      }
      if (statusCode === 401 || statusCode === 404) {
        return new Error("아이디 또는 비밀번호를 다시 확인해 주세요.");
      }

      return new Error(message);
    }

    return error instanceof Error
      ? error
      : new Error("알 수 없는 오류가 발생했습니다.");
  }
}

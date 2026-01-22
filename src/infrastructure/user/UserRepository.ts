import {
  IUserRepository,
  UpdateEmailData,
  UpdateProfileData,
} from "@domain/user/IUserRepository";
import { User } from "@domain/user/User";
import { apiClient } from "@shared/api/client";
import { API_PREFIX } from "@shared/api/config";
import { ApiResponse } from "@shared/api/types";
import { injectable } from "tsyringe";

import { UpdateEmailRequestDto, UpdateProfileRequestDto, UserResponseDto } from "./dto";

@injectable()
export class UserRepository implements IUserRepository {
  async getMe(): Promise<User> {
    const response = await apiClient.get<ApiResponse<UserResponseDto>>(
      `${API_PREFIX}/users/me`,
    );
    const { data } = response.data;
    return this.mapToUser(data);
  }

  async updateProfile(data: UpdateProfileData): Promise<void> {
    const requestBody: UpdateProfileRequestDto = {
      ...data,
    };
    await apiClient.patch<ApiResponse<void>>(
      `${API_PREFIX}/users/me`,
      requestBody,
    );
  }

  async deleteAccount(): Promise<void> {
    await apiClient.delete<ApiResponse<void>>(`${API_PREFIX}/users/me`);
  }

  async updateEmail(data: UpdateEmailData): Promise<void> {
    const requestBody: UpdateEmailRequestDto = {
      email: data.email,
      verificationToken: data.verificationToken,
    };
    await apiClient.patch<ApiResponse<void>>(
      `${API_PREFIX}/users/me/email`,
      requestBody,
    );
  }

  private mapToUser(dto: UserResponseDto): User {
    return new User(
      dto.id,
      dto.userId,
      dto.name,
      dto.group,
      dto.phone,
      dto.birth,
      dto.gender,
      dto.rank,
      dto.email,
      dto.emailVerifiedAt,
      dto.isDeleted,
      dto.createdAt,
      dto.updatedAt,
    );
  }
}

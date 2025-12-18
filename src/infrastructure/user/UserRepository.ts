import { IUserRepository } from '@domain/user/IUserRepository';
import { User } from '@domain/user/User';
import { apiClient } from '@shared/api/client';
import { ApiResponse } from '@shared/api/types';
import { injectable } from 'tsyringe';

import { UserResponseDto } from './dto';

@injectable()
export class UserRepository implements IUserRepository {
  async getMe(): Promise<User> {
    const response = await apiClient.get<ApiResponse<UserResponseDto>>('/api/users/me');
    const { data } = response.data;
    return this.mapToUser(data);
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
      dto.isDeleted,
      dto.createdAt,
      dto.updatedAt
    );
  }
}

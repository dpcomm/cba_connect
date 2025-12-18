import { IAuthRepository } from '@domain/auth/IAuthRepository';
import { IUserRepository } from '@domain/user/IUserRepository';
import { User } from '@domain/user/User';
import { inject, injectable } from 'tsyringe';

@injectable()
export class AutoLoginUseCase {
  constructor(
    @inject('AuthRepository') private authRepository: IAuthRepository,
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  /**
   * 앱 시작 시 자동 로그인 시도
   * @returns User (성공 시) 또는 null (실패 시)
   */
  async execute(): Promise<User | null> {
    const isAutoLoginEnabled = await this.authRepository.getAutoLoginEnabled();
    if (!isAutoLoginEnabled) {
      return null;
    }

    const refreshToken = await this.authRepository.getStoredRefreshToken();
    if (!refreshToken) {
      return null;
    }

    try {
      await this.authRepository.refreshAccessToken();
      const user = await this.userRepository.getMe();
      return user;
    } catch {
      await this.authRepository.setAutoLoginEnabled(false);
      return null;
    }
  }
}

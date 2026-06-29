import { IAuthRepository } from "@domain/auth/IAuthRepository";
import { IUserRepository } from "@domain/user/IUserRepository";
import { User } from "@domain/user/User";
import { inject, injectable } from "tsyringe";

@injectable()
export class AutoLoginUseCase {
  constructor(
    @inject("AuthRepository") private authRepository: IAuthRepository,
    @inject("UserRepository") private userRepository: IUserRepository,
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
    } catch (error) {
      // 401 Unauthorized 에러 등은 client.ts의 interceptor에서 이미 토큰을 삭제하므로
      // 여기서는 별도로 저장된 로그인 설정을 건드리지 않습니다.
      // (네트워크 에러 등으로 실패 시, 다음에 다시 시도할 수 있도록 상태 유지)
      return null;
    }
  }
}

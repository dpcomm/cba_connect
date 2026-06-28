import { Auth } from '@domain/auth/Auth';
import { IAuthRepository } from '@domain/auth/IAuthRepository';
import { ExpoPushTokenRepository } from '@domain/notification/ExpoPushTokenRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class LoginUseCase {
  constructor(
    @inject('AuthRepository') private authRepository: IAuthRepository,
    @inject('ExpoPushTokenRepository') private expoPushTokenRepository: ExpoPushTokenRepository
  ) {}

  async execute(userId: string, password: string, autoLogin: boolean): Promise<Auth> {
    const auth = await this.authRepository.login(userId, password);
    await this.authRepository.setAutoLoginEnabled(autoLogin);

    // 푸시 토큰 등록은 부가 기능이므로 실패해도 로그인 자체를 막지 않는다.
    // (에뮬레이터 등 푸시 토큰을 발급할 수 없는 환경 포함)
    try {
      await this.expoPushTokenRepository.register(auth.user.id);
    } catch (error) {
      console.warn('Expo push token registration failed (non-blocking):', error);
    }

    return auth;
  }
}

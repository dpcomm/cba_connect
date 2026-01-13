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
    await this.expoPushTokenRepository.register(auth.user.id);
    return auth;
  }
}

import { Auth } from '@domain/auth/Auth';
import { IAuthRepository } from '@domain/auth/IAuthRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class LoginUseCase {
  constructor(
    @inject('AuthRepository') private authRepository: IAuthRepository
  ) {}

  async execute(userId: string, password: string, autoLogin: boolean): Promise<Auth> {
    const auth = await this.authRepository.login(userId, password);
    await this.authRepository.setAutoLoginEnabled(autoLogin);
    return auth;
  }
}

import { Auth } from '@domain/auth/Auth';
import { AuthRepository } from '@domain/auth/AuthRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class LoginUseCase {
  constructor(@inject('AuthRepository') private readonly authRepository: AuthRepository) {}

  async execute(userId: string, password: string, autoLogin: boolean): Promise<Auth> {
    if (!userId || !password) {
      throw new Error('아이디와 비밀번호를 입력해주세요.');
    }
    return await this.authRepository.login(userId, password, autoLogin);
  }
}

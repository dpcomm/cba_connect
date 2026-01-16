import { IAuthRepository } from '@domain/auth/IAuthRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class VerifyEmailCodeUseCase {
  constructor(
    @inject('AuthRepository') private authRepository: IAuthRepository
  ) {}

  async execute(email: string, code: string): Promise<string> {
    return await this.authRepository.verifyEmailCode(email, code);
  }
}

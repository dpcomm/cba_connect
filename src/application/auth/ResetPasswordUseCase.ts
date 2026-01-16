import { IAuthRepository, ResetPasswordData } from '@domain/auth/IAuthRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject('AuthRepository') private authRepository: IAuthRepository
  ) {}

  async execute(data: ResetPasswordData): Promise<void> {
    await this.authRepository.resetPassword(data);
  }
}

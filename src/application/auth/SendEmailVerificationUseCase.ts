import { EmailVerificationType } from '@domain/auth/EmailVerificationType';
import { IAuthRepository } from '@domain/auth/IAuthRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class SendEmailVerificationUseCase {
  constructor(
    @inject('AuthRepository') private authRepository: IAuthRepository
  ) {}

  async execute(email: string, type: EmailVerificationType, userId?: string): Promise<void> {
    await this.authRepository.sendEmailVerification(email, type, userId);
  }
}

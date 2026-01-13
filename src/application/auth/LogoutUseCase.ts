import { IAuthRepository } from '@domain/auth/IAuthRepository';
import { ExpoPushTokenRepository } from '@domain/notification/ExpoPushTokenRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class LogoutUseCase {
  constructor(
    @inject('AuthRepository') private authRepository: IAuthRepository,
    @inject('ExpoPushTokenRepository') private expoPushTokenRepository: ExpoPushTokenRepository,    
  ) {}

  async execute(): Promise<void> {
    await this.expoPushTokenRepository.delete();
    return this.authRepository.logout();
  }
}

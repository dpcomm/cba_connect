import { AuthRepository } from '@domain/auth/AuthRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class LogoutUseCase {
  constructor(
    @inject('AuthRepository') private authRepository: AuthRepository
  ) {}

  async execute(): Promise<void> {
    return this.authRepository.logout();
  }
}

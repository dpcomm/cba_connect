import { Auth } from '@domain/auth/Auth';
import { AuthRepository } from '@domain/auth/AuthRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class RefreshUseCase {
  constructor(
    @inject('AuthRepository') private authRepository: AuthRepository
  ) {}

  async execute(refreshToken: string): Promise<Auth> {
    return this.authRepository.refresh(refreshToken);
  }
}

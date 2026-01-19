import { IAuthRepository } from '@domain/auth/IAuthRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class RefreshUseCase {
  constructor(
    @inject('AuthRepository') private authRepository: IAuthRepository
  ) {}

  async execute(): Promise<string> {
    return this.authRepository.refreshAccessToken();
  }
}


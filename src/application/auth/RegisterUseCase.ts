import { Auth } from '@domain/auth/Auth';
import { AuthRepository, RegisterData } from '@domain/auth/AuthRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class RegisterUseCase {
  constructor(
    @inject('AuthRepository') private authRepository: AuthRepository
  ) {}

  async execute(data: RegisterData): Promise<Auth> {
    return this.authRepository.register(data);
  }
}

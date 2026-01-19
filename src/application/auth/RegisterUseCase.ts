import { Auth } from '@domain/auth/Auth';
import { IAuthRepository, RegisterData } from '@domain/auth/IAuthRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class RegisterUseCase {
  constructor(
    @inject('AuthRepository') private authRepository: IAuthRepository
  ) {}

  async execute(data: RegisterData): Promise<Auth> {
    return this.authRepository.register(data);
  }
}

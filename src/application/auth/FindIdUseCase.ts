import { IAuthRepository } from '@domain/auth/IAuthRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class FindIdUseCase {
  constructor(
    @inject('AuthRepository') private authRepository: IAuthRepository
  ) {}

  async execute(name: string, phone: string): Promise<string[]> {
    return this.authRepository.findId(name, phone);
  }
}

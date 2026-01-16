import { IAuthRepository } from '@domain/auth/IAuthRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CheckIdDuplicateUseCase {
  constructor(
    @inject('AuthRepository') private authRepository: IAuthRepository
  ) {}

  async execute(id: string): Promise<boolean> {
    return this.authRepository.checkIdDuplicate(id);
  }
}

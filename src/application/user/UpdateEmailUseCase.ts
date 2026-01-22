import { IUserRepository, UpdateEmailData } from '@domain/user/IUserRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateEmailUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async execute(data: UpdateEmailData): Promise<void> {
    await this.userRepository.updateEmail(data);
  }
}

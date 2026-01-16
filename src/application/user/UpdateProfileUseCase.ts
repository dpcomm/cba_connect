import { IUserRepository, UpdateProfileData } from '@domain/user/IUserRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateProfileUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async execute(data: UpdateProfileData): Promise<void> {
    await this.userRepository.updateProfile(data);
  }
}

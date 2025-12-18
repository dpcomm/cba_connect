import { IUserRepository } from '@domain/user/IUserRepository';
import { User } from '@domain/user/User';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetMeUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async execute(): Promise<User> {
    return this.userRepository.getMe();
  }
}

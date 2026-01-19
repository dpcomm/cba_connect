import { IUserRepository } from "@domain/user/IUserRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteAccountUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<void> {
    return this.userRepository.deleteAccount();
  }
}

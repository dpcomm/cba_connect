import {
  IUserRepository,
  UserGroupOption,
} from "@domain/user/IUserRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetUserGroupOptionsUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<UserGroupOption[]> {
    return this.userRepository.getGroupOptions();
  }
}

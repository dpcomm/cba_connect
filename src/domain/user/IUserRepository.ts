import { User } from './User';

export interface IUserRepository {
  getMe(): Promise<User>;
}

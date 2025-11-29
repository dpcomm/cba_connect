import { User } from './User';

export interface UserRepository {
  getProfile(): Promise<User>;
  updateProfile(user: User): Promise<User>;
  deleteAccount(): Promise<void>;
}

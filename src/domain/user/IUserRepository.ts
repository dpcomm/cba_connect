import { User } from "./User";

export interface UpdateProfileData {
  name?: string;
  group?: string;
  phone?: string;
  birth?: string;
  gender?: string;
  password?: string;
}

export interface IUserRepository {
  getMe(): Promise<User>;
  updateProfile(data: UpdateProfileData): Promise<void>;
  deleteAccount(): Promise<void>;
}

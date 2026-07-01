import { User } from "./User";

export interface UpdateProfileData {
  name?: string;
  group?: string;
  phone?: string;
  birth?: string;
  gender?: string;
  password?: string;
}

export interface UpdateEmailData {
  email: string;
  verificationToken: string;
}

export interface UserGroupOption {
  value: string;
  label: string;
}

export interface IUserRepository {
  getMe(): Promise<User>;
  updateProfile(data: UpdateProfileData): Promise<void>;
  updateEmail(data: UpdateEmailData): Promise<void>;
  deleteAccount(): Promise<void>;
  getGroupOptions(): Promise<UserGroupOption[]>;
}

export interface UserResponseDto {
  id: number;
  userId: string;
  name: string;
  group: string;
  phone: string;
  birth: string;
  gender: string;
  rank: string;
  email: string;
  emailVerifiedAt: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequestDto {
  name?: string;
  group?: string;
  phone?: string;
  birth?: string;
  gender?: string;
  password?: string;
}

export interface UpdateEmailRequestDto {
  email: string;
  verificationToken: string;
}

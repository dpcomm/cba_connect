export class Auth {
  constructor(
    public readonly accessToken: string,
    public readonly refreshToken: string,
    public readonly user: {
      id: number;
      rank: string;
      userId: string;
      name: string;
      group: string;
      phone: string;
      birth: string;
      gender: string;
      isDeleted: boolean;
      createdAt: string;
      updatedAt: string;
    }
  ) {}
}
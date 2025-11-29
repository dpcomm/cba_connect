export class Auth {
  constructor(
    public readonly accessToken: string,
    public readonly refreshToken: string,
    public readonly user: {
      id: string;
      userId: string;
      name: string;
      group: string;
      phone: string;
      birth: string;
      gender: string;
    }
  ) {}
}

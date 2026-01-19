import { User } from '../user/User';

export class Auth {
  constructor(
    public readonly accessToken: string,
    public readonly refreshToken: string,
    public readonly user: User
  ) {}
}
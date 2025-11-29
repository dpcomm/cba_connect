export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly group: string,
    public readonly phoneNumber: string,
    public readonly birthDate: string
  ) {}
}

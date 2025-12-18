export class User {
  constructor(
    public readonly id: number,
    public readonly userId: string,
    public readonly name: string,
    public readonly group: string,
    public readonly phone: string,
    public readonly birth: string,
    public readonly gender: string,
    public readonly rank: string,
    public readonly isDeleted: boolean,
    public readonly createdAt: string,
    public readonly updatedAt: string
  ) {}
}

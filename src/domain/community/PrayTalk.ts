export class PrayTalk {
  constructor(
    public readonly id: string,
    public readonly authorId: string,
    public readonly content: string,
    public readonly createdAt: Date,
    public readonly isAnonymous: boolean
  ) {}
}

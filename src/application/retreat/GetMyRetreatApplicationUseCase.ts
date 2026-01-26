import { RetreatApplication } from "@domain/retreat/RetreatApplication";
import { RetreatRepository } from "@infrastructure/retreat/RetreatRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetMyRetreatApplicationUseCase {
  constructor(
    @inject("RetreatRepository") private retreatRepository: RetreatRepository,
  ) {}

  async execute(retreatId: number): Promise<RetreatApplication | null> {
    return this.retreatRepository.getMyApplication(retreatId);
  }
}

import { ApplicationDetail } from "@domain/retreat/ApplicationDetail";
import { RetreatRepository } from "@infrastructure/retreat/RetreatRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetMyApplicationDetailUseCase {
  constructor(
    @inject("RetreatRepository") private retreatRepository: RetreatRepository,
  ) {}

  async execute(retreatId: number): Promise<ApplicationDetail | null> {
    return this.retreatRepository.getApplicationDetail(retreatId);
  }
}

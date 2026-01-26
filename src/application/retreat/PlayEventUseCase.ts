import { RetreatRepository } from "@infrastructure/retreat/RetreatRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class PlayEventUseCase {
  constructor(
    @inject(RetreatRepository) private retreatRepository: RetreatRepository,
  ) {}

  async execute(retreatId: number): Promise<{ eventResult: "WIN" | "LOSE" }> {
    return this.retreatRepository.playEvent(retreatId);
  }
}

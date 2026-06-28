import { RetreatRepository } from "@infrastructure/retreat/RetreatRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CancelApplicationUseCase {
  constructor(
    @inject("RetreatRepository") private retreatRepository: RetreatRepository,
  ) {}

  async execute(retreatId: number): Promise<void> {
    return this.retreatRepository.cancelApplication(retreatId);
  }
}

import { ApplicationOptions } from "@domain/retreat/ApplicationOption";
import { RetreatRepository } from "@infrastructure/retreat/RetreatRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetApplicationOptionsUseCase {
  constructor(
    @inject("RetreatRepository") private retreatRepository: RetreatRepository,
  ) {}

  async execute(retreatId: number): Promise<ApplicationOptions> {
    return this.retreatRepository.getApplicationOptions(retreatId);
  }
}

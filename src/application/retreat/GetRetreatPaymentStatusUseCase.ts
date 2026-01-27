import { RetreatRepository } from "@infrastructure/retreat/RetreatRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetRetreatPaymentStatusUseCase {
  constructor(
    @inject("RetreatRepository") private retreatRepository: RetreatRepository,
  ) {}

  async execute(retreatId: number): Promise<{ isPaid: boolean }> {
    return this.retreatRepository.getPaymentStatus(retreatId);
  }
}

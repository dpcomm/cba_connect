import { Carpool } from '@domain/carpool/Carpool';
import { ICarpoolRepository } from '@domain/carpool/ICarpoolRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetAvailableCarpoolsUseCase {
  constructor(
    @inject('CarpoolRepository')
    private readonly carpoolRepository: ICarpoolRepository
  ) {}

  /** swagger 기준: userId required */
  async execute(userId: number): Promise<Carpool[]> {
    return this.carpoolRepository.getAvailableCarpools(userId);
  }
}

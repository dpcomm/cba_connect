import { Carpool } from '@domain/carpool/Carpool';
import { ICarpoolRepository } from '@domain/carpool/ICarpoolRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetAllCarpoolsUseCase {
  constructor(
    @inject('CarpoolRepository')
    private carpoolRepository: ICarpoolRepository
  ) {}

  async execute(): Promise<Carpool[]> {
    return this.carpoolRepository.getAllCarpools();
  }
}

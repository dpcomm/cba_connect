import { Carpool } from '@domain/carpool/Carpool';
import { CarpoolStatus } from '@domain/carpool/CarpoolStatus';
import { ICarpoolRepository } from '@domain/carpool/ICarpoolRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateCarpoolStatusUseCase {
  constructor(
    @inject('CarpoolRepository') private readonly carpoolRepository: ICarpoolRepository
  ) {}

  async execute(roomId: number, newStatus: CarpoolStatus): Promise<Carpool> {
    return this.carpoolRepository.updateCarpoolStatus(roomId, newStatus);
  }
}

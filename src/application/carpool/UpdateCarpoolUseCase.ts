import { Carpool } from '@domain/carpool/Carpool';
import { ICarpoolRepository, UpdateCarpoolData } from '@domain/carpool/ICarpoolRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateCarpoolUseCase {
  constructor(
    @inject('CarpoolRepository') private readonly carpoolRepository: ICarpoolRepository
  ) {}

  async execute(id: number, data: UpdateCarpoolData): Promise<Carpool> {
    return this.carpoolRepository.updateCarpool(id, data);
  }
}

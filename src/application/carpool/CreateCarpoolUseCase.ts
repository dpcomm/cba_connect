import { Carpool } from '@domain/carpool/Carpool';
import { CreateCarpoolData, ICarpoolRepository } from '@domain/carpool/ICarpoolRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateCarpoolUseCase {
  constructor(
    @inject('CarpoolRepository') private readonly carpoolRepository: ICarpoolRepository
  ) {}

  async execute(data: CreateCarpoolData): Promise<Carpool> {
    return this.carpoolRepository.createCarpool(data);
  }
}

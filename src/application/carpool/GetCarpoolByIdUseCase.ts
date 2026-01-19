import { Carpool } from '@domain/carpool/Carpool';
import { ICarpoolRepository } from '@domain/carpool/ICarpoolRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetCarpoolByIdUseCase {
  constructor(
    @inject('CarpoolRepository') private readonly carpoolRepository: ICarpoolRepository
  ) {}

  async execute(id: number): Promise<Carpool> {
    return this.carpoolRepository.getCarpoolById(id);
  }
}

import { ICarpoolRepository } from '@domain/carpool/ICarpoolRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class DeleteCarpoolUseCase {
  constructor(
    @inject('CarpoolRepository') private readonly carpoolRepository: ICarpoolRepository
  ) {}

  async execute(id: number): Promise<boolean> {
    return this.carpoolRepository.deleteCarpool(id);
  }
}

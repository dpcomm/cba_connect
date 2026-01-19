import { CarpoolDetail } from '@domain/carpool/CarpoolDetail';
import { ICarpoolRepository } from '@domain/carpool/ICarpoolRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetCarpoolDetailUseCase {
  constructor(
    @inject('CarpoolRepository') private readonly carpoolRepository: ICarpoolRepository
  ) {}

  async execute(id: number): Promise<CarpoolDetail> {
    return this.carpoolRepository.getCarpoolDetail(id);
  }
}

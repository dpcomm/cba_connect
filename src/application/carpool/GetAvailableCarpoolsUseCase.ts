import { Carpool } from '@domain/carpool/Carpool';
import { ICarpoolRepository } from '@domain/carpool/ICarpoolRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetAvailableCarpoolsUseCase {
  constructor(
    @inject('CarpoolRepository')
    private readonly carpoolRepository: ICarpoolRepository
  ) {}

  /**
   * userId가 있으면: 해당 사용자가 참여중인 카풀 제외 + 살아있는 카풀만
   * userId가 없으면: 필터 없이 살아있는 카풀만
   */
  async execute(userId?: number): Promise<Carpool[]> {
    return this.carpoolRepository.getAvailableCarpools(userId);
  }
}

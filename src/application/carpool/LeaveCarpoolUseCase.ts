import { ICarpoolRepository } from '@domain/carpool/ICarpoolRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class LeaveCarpoolUseCase {
  constructor(
    @inject('CarpoolRepository') private readonly carpoolRepository: ICarpoolRepository
  ) {}

  async execute(userId: number, roomId: number): Promise<boolean> {
    return this.carpoolRepository.leaveCarpool(userId, roomId);
  }
}

import { Carpool } from '@domain/carpool/Carpool';
import { ICarpoolRepository } from '@domain/carpool/ICarpoolRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetParticipatingCarpoolsUseCase {
    constructor(
        @inject('CarpoolRepository')
        private readonly carpoolRepository: ICarpoolRepository
    ) { }

    async execute(userId: number): Promise<Carpool[]> {
        return this.carpoolRepository.getParticipatingCarpools(userId);
    }
}
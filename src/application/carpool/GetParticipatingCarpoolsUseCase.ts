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
        const id = Number(userId);
        if (!id || Number.isNaN(id)) return [];
        return this.carpoolRepository.getParticipatingCarpools(id);
    }
}
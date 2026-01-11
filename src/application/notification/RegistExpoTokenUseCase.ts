import { ExpoPushToken } from "@domain/notification/ExpoPushToken";
import { ExpoPushTokenRepository } from "@domain/notification/ExpoPushTokenRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class RegisterExpoTokenUseCase {
    constructor(
        @inject('ExpoPushTokenRepository') private expoPushTokenRepository: ExpoPushTokenRepository
    ) {}

    async execute(id: number): Promise<ExpoPushToken> {
        const token = await this.expoPushTokenRepository.register(id);
        return token;
    }
}
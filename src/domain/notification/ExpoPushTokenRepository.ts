import { ExpoPushToken } from "./ExpoPushToken";

export interface ExpoPushTokenRepository {
    register(userId: number): Promise<ExpoPushToken>;
}
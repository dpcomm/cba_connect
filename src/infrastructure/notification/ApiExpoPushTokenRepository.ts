import { ExpoPushToken } from "@domain/notification/ExpoPushToken";
import { ExpoPushTokenRepository } from "@domain/notification/ExpoPushTokenRepository";
import { apiClient } from "@shared/api/client";
import { ApiResponse } from "@shared/api/types";
import { injectable } from "tsyringe";
import { getExpoPushToken } from "./ExpoPushTokenProvider";
import { ExpoTokenResponseDto, RegisterRequestDto } from "./dto";

@injectable()
export class ApiExpoPushTokenRepository implements ExpoPushTokenRepository {
    async register(userId: number): Promise<ExpoPushToken> {
        try {
            const token = await getExpoPushToken();
             
            if (!token) {
            throw new Error('Expo push token not available');
            }
                        
            const requestBody: RegisterRequestDto = {
                userId: userId,
                token: token,
            };

            const response = await apiClient.post<ApiResponse<ExpoTokenResponseDto>>('/api/expoPushToken/regist', requestBody);
            const responseData = response.data.data;
            const expoToken = this.mapToExpoToken(responseData);

            return expoToken;

        } catch (error: any) {
            throw error;
        }
    }

    async delete(): Promise<void> {
        try {
            const token = await getExpoPushToken();

            if(!token) {
                throw new Error('Expo push token not available');
            }

            const requestBody = {
                token: token,
            };

            const response = await apiClient.post<ApiResponse<null>>('/api/expoPushToken/delete', requestBody);
        } catch (error: any) {
            throw error;
        }
    }

    private mapToExpoToken(data: ExpoTokenResponseDto): ExpoPushToken {
        return new ExpoPushToken(
            data.userId,
            data.expoPushToken,
        );
    }
}


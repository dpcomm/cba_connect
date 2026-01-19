export interface RegisterRequestDto {
    userId: number;
    token: string;
}

export interface ExpoTokenResponseDto {
    userId: number;
    expoPushToken: string;
}
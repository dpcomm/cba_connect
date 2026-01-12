import { apiClient } from '@shared/api/client';
import { ApiErrorResponse, ApiResponse } from '@shared/api/types';
import { isAxiosError } from 'axios';
import { injectable } from 'tsyringe';

import { Carpool } from '@domain/carpool/Carpool';
import { CarpoolStatus } from '@domain/carpool/CarpoolStatus';
import { CreateCarpoolData, ICarpoolRepository, UpdateCarpoolData } from '@domain/carpool/ICarpoolRepository';

import {
  CarpoolResponseDto,
  CreateCarpoolRequestDto,
  ParticipationCarpoolRequestDto,
  UpdateCarpoolStatusRequestDto,
} from './dto';

@injectable()
export class CarpoolRepository implements ICarpoolRepository {
  async getAvailableCarpools(userId?: number): Promise<Carpool[]> {
    try {
      const uid = userId == null ? undefined : Number(userId);
      const hasUid = uid != null && !Number.isNaN(uid);

      const res = await apiClient.request<ApiResponse<CarpoolResponseDto[]>>({
        method: 'GET',
        url: '/api/carpool/available',
        params: hasUid ? { userId: uid } : undefined,
        data: hasUid ? { userId: uid } : {},
      });


      return res.data.data.map(this.mapToCarpool);
    } catch (e) {
      if (isAxiosError<ApiErrorResponse>(e) && e.response?.status === 404) return [];
      throw this.normalizeError(e);
    }
  }

  async getParticipatingCarpools(userId: number): Promise<Carpool[]> {
    const id = Number(userId);
    if (!id || Number.isNaN(id)) return [];

    try {
      const res = await apiClient.get<ApiResponse<CarpoolResponseDto[]>>(
        `/api/carpool/participating/${id}`
      );
      return res.data.data.map(this.mapToCarpool);
    } catch (e) {
      if (isAxiosError<ApiErrorResponse>(e) && e.response?.status === 404) return [];
      throw this.normalizeError(e);
    }
  }

  async getAllCarpools(): Promise<Carpool[]> {
    try {
      const res = await apiClient.get<ApiResponse<CarpoolResponseDto[]>>('/api/carpool');
      return res.data.data.map(this.mapToCarpool);
    } catch (e) {
      if (isAxiosError<ApiErrorResponse>(e) && e.response?.status === 404) return [];
      throw this.normalizeError(e);
    }
  }

  async createCarpool(data: CreateCarpoolData): Promise<Carpool> {
    try {
      const body: CreateCarpoolRequestDto = {
        driverId: data.driverId,
        carInfo: data.carInfo,
        departureTime: data.departureTime,
        origin: data.origin,
        originDetailed: data.originDetailed ?? null,
        destination: data.destination,
        destinationDetailed: data.destinationDetailed ?? null,
        seatsTotal: data.seatsTotal,
        note: data.note ?? '',
        originLat: data.originLat,
        originLng: data.originLng,
        destLat: data.destLat,
        destLng: data.destLng,
      };

      const res = await apiClient.post<ApiResponse<CarpoolResponseDto>>('/api/carpool', body);
      return this.mapToCarpool(res.data.data);
    } catch (e) {
      console.log('--------------------');
      console.log(e);
      throw e;
    }
  }

  async getCarpoolById(id: number): Promise<Carpool> {
    try {
      const res = await apiClient.get<ApiResponse<CarpoolResponseDto>>(`/api/carpool/${id}`);
      return this.mapToCarpool(res.data.data);
    } catch (e) {
      throw this.normalizeError(e);
    }
  }

  async getCarpoolDetail(id: number): Promise<Carpool> {
    try {
      const res = await apiClient.get<ApiResponse<CarpoolResponseDto>>(`/api/carpool/detail/${id}`);
      return this.mapToCarpool(res.data.data);
    } catch (e) {
      throw this.normalizeError(e);
    }
  }

  async findMyCarpools(userId: number): Promise<Carpool[]> {
    try {
      const res = await apiClient.get<ApiResponse<CarpoolResponseDto[]>>(`/api/carpool/my/${userId}`);
      return res.data.data.map(this.mapToCarpool);
    } catch (e) {
      if (isAxiosError<ApiErrorResponse>(e) && e.response?.status === 404) return [];
      throw this.normalizeError(e);
    }
  }

  async updateCarpool(id: number, data: UpdateCarpoolData): Promise<Carpool> {
    try {
      const body: any = {
        driverId: data.driverId,
        carInfo: data.carInfo,
        departureTime: data.departureTime,
        origin: data.origin,
        originDetailed: data.originDetailed ?? null,
        destination: data.destination,
        destinationDetailed: data.destinationDetailed ?? null,
        seatsTotal: data.seatsTotal,
        note: data.note ?? '',
        originLat: data.originLat,
        originLng: data.originLng,
        destLat: data.destLat,
        destLng: data.destLng,
      };
      // 필요 시: body.carpoolId = id;

      const res = await apiClient.post<ApiResponse<CarpoolResponseDto>>(`/api/carpool/update/${id}`, body);
      return this.mapToCarpool(res.data.data);
    } catch (e) {
      throw this.normalizeError(e);
    }
  }

  async joinCarpool(userId: number, roomId: number): Promise<boolean> {
    try {
      const body: ParticipationCarpoolRequestDto = { userId, roomId };
      const res = await apiClient.post<ApiResponse<boolean>>('/api/carpool/join', body);
      return Boolean(res.data.data);
    } catch (e) {
      throw this.normalizeError(e);
    }
  }

  async leaveCarpool(userId: number, roomId: number): Promise<boolean> {
    try {
      const body: ParticipationCarpoolRequestDto = { userId, roomId };
      const res = await apiClient.post<ApiResponse<boolean>>('/api/carpool/leave', body);
      return Boolean(res.data.data);
    } catch (e) {
      throw this.normalizeError(e);
    }
  }

  async deleteCarpool(id: number): Promise<boolean> {
    try {
      const res = await apiClient.post<ApiResponse<boolean>>(`/api/carpool/delete/${id}`);
      return Boolean(res.data.data);
    } catch (e) {
      throw this.normalizeError(e);
    }
  }

  async updateCarpoolStatus(roomId: number, newStatus: CarpoolStatus): Promise<Carpool> {
    try {
      const body: UpdateCarpoolStatusRequestDto = { roomId, newStatus: newStatus as any };
      const res = await apiClient.post<ApiResponse<CarpoolResponseDto>>('/api/carpool/status', body);
      return this.mapToCarpool(res.data.data);
    } catch (e) {
      throw this.normalizeError(e);
    }
  }

  /** DTO -> Domain (README 원칙) */
  private mapToCarpool(dto: CarpoolResponseDto): Carpool {
    return new Carpool(
      dto.id,
      dto.driverId,
      dto.carInfo ?? null,
      dto.departureTime,
      dto.origin,
      dto.originDetailed ?? null,
      dto.destination,
      dto.destinationDetailed ?? null,
      dto.seatsTotal,
      dto.seatsLeft,
      dto.note,
      dto.originLat ?? null,
      dto.originLng ?? null,
      dto.destLat ?? null,
      dto.destLng ?? null,
      dto.status as CarpoolStatus,
      dto.isArrived,
      dto.createdAt,
      dto.updatedAt
    );
  }

  private normalizeError(error: unknown): Error {
    if (isAxiosError<ApiErrorResponse>(error)) {
      const message = error.response?.data?.message || error.message || '요청 중 오류가 발생했습니다.';
      const statusCode = error.response?.status;

      if (statusCode === 400) return new Error(message || '잘못된 요청입니다.');
      if (statusCode === 401) return new Error('인증에 실패했습니다.');
      if (statusCode === 404) return new Error('요청한 데이터를 찾을 수 없습니다.');
      return new Error(message);
    }
    return error instanceof Error ? error : new Error('알 수 없는 오류가 발생했습니다.');
  }
}

import {
  ApplicationDetail,
  ApplicationStatus,
  PaymentStatus,
  TransportDirection,
} from "@domain/retreat/ApplicationDetail";
import {
  ApplicationOptions,
  MealType,
  TransportType,
} from "@domain/retreat/ApplicationOption";
import { RetreatApplication } from "@domain/retreat/RetreatApplication";
import { apiClient } from "@shared/api/client";
import { API_PREFIX } from "@shared/api/config";
import { injectable } from "tsyringe";

interface ApplicationDetailApiDto {
  id: number;
  retreatId: number;
  status: ApplicationStatus;
  paymentStatus: PaymentStatus;
  applicationMeals: {
    id: number;
    retreatMeal: { id: number; mealDay: string; mealType: MealType };
  }[];
  applicationTransports: {
    id: number;
    vehicleNumber: string | null;
    retreatTransport: {
      id: number;
      direction: TransportDirection;
      transportType: TransportType;
    };
  }[];
}

interface RetreatApplicationApiResponse {
  success: boolean;
  data: RetreatApplication;
  timestamp: string;
}

interface ApplicationOptionsApiResponse {
  success: boolean;
  data: ApplicationOptions;
  timestamp: string;
}

export interface UpsertApplicationTransport {
  retreatTransportId: number;
  vehicleNumber?: string | null;
  remark?: string | null;
}

export interface UpsertApplicationRequest {
  group: string;
  surveyId: number;
  retreatMealIds: number[];
  transports: UpsertApplicationTransport[];
  answers: {
    questionId: number;
    questionOptionId?: number | null;
    content?: string | null;
  }[];
}

@injectable()
export class RetreatRepository {
  async getMyApplication(
    retreatId: number,
  ): Promise<RetreatApplication | null> {
    try {
      const response = await apiClient.get<RetreatApplicationApiResponse>(
        `${API_PREFIX}/application/me/${retreatId}`,
      );
      return response.data.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async playEvent(retreatId: number): Promise<{ eventResult: "WIN" | "LOSE" }> {
    try {
      const response = await apiClient.post<{
        success: boolean;
        data: { eventResult: "WIN" | "LOSE" };
      }>(`${API_PREFIX}/application/event`, { retreatId });

      return response.data.data;
    } catch (error: any) {
      if (error.response?.status === 409) {
        throw new Error("ALREADY_PARTICIPATED");
      }
      throw error;
    }
  }

  async upsertApplication(
    retreatId: number,
    request: UpsertApplicationRequest,
  ): Promise<void> {
    await apiClient.put<RetreatApplicationApiResponse>(
      `${API_PREFIX}/application/me/${retreatId}`,
      request,
    );
  }

  async getApplicationOptions(retreatId: number): Promise<ApplicationOptions> {
    const response = await apiClient.get<ApplicationOptionsApiResponse>(
      `${API_PREFIX}/application/options/${retreatId}`,
    );
    return response.data.data;
  }

  /** 내 신청 내역 상세 조회. 신청 이력이 없으면 null. */
  async getApplicationDetail(
    retreatId: number,
  ): Promise<ApplicationDetail | null> {
    try {
      const response = await apiClient.get<{ data: ApplicationDetailApiDto }>(
        `${API_PREFIX}/application/me/${retreatId}`,
      );
      const d = response.data.data;
      return {
        id: d.id,
        retreatId: d.retreatId,
        status: d.status,
        paymentStatus: d.paymentStatus,
        meals: (d.applicationMeals ?? []).map((m) => ({
          id: m.retreatMeal.id,
          mealDay: m.retreatMeal.mealDay,
          mealType: m.retreatMeal.mealType,
        })),
        transports: (d.applicationTransports ?? []).map((t) => ({
          transportId: t.retreatTransport.id,
          direction: t.retreatTransport.direction,
          transportType: t.retreatTransport.transportType,
          vehicleNumber: t.vehicleNumber ?? null,
        })),
      };
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  /** 내 신청 취소 (soft cancel — status가 CANCELED로 바뀌고 데이터는 보존됨) */
  async cancelApplication(retreatId: number): Promise<void> {
    await apiClient.delete(`${API_PREFIX}/application/me/${retreatId}`);
  }

  /** 신청서(survey) ID 조회 — upsert 요청에 필수. /application/form 응답의 survey.id */
  async getApplicationSurveyId(retreatId: number): Promise<number> {
    const response = await apiClient.get<{
      success: boolean;
      data: { survey: { id: number } };
    }>(`${API_PREFIX}/application/form/${retreatId}`);
    return response.data.data.survey.id;
  }

  async getPaymentStatus(retreatId: number): Promise<{ isPaid: boolean }> {
    try {
      const response = await apiClient.get<RetreatApplicationApiResponse>(
        `${API_PREFIX}/application/me/paid/${retreatId}`,
      );
      return { isPaid: (response.data.data as any).isPaid };
    } catch (error: any) {
      if (error.response?.status === 404) {
        return { isPaid: false };
      }
      throw error;
    }
  }
}

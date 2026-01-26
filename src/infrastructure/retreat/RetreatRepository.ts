import { RetreatApplication } from "@domain/retreat/RetreatApplication";
import { apiClient } from "@shared/api/client";
import { API_PREFIX } from "@shared/api/config";
import { injectable } from "tsyringe";

interface RetreatApplicationApiResponse {
  success: boolean;
  data: RetreatApplication;
  timestamp: string;
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
}

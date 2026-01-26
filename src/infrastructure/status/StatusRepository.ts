import { SystemConfig } from "@domain/system/SystemConfig";
import { apiClient } from "@shared/api/client";
import { API_PREFIX } from "@shared/api/config";
import { injectable } from "tsyringe";

interface SystemConfigApiResponse {
  statusCode: number;
  message: string;
  data: SystemConfig;
}

@injectable()
export class StatusRepository {
  async getSystemConfig(): Promise<SystemConfig> {
    const response = await apiClient.get<SystemConfigApiResponse>(
      `${API_PREFIX}/system`,
    );
    return response.data.data;
  }
}

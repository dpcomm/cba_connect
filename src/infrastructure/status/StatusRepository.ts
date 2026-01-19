import { ApplicationVersion } from "@domain/status/ApplicationVersion";
import { API_PREFIX, apiClient } from "@shared/api/client";
import { injectable } from "tsyringe";

interface VersionApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ApplicationVersion;
}

@injectable()
export class StatusRepository {
  async getApplicationVersion(): Promise<ApplicationVersion> {
    const response = await apiClient.get<VersionApiResponse>(
      `${API_PREFIX}/status/version/application`,
    );
    return response.data.data;
  }
}

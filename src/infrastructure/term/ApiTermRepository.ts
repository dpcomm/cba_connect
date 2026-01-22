import { ITermRepository } from "@domain/term/ITermRepository";
import { Term } from "@domain/term/Term";
import { apiClient } from "@shared/api/client";
import { API_PREFIX } from "@shared/api/config";
import { ApiResponse } from "@shared/api/types";
import { injectable } from "tsyringe";

interface TermResponseDto {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

@injectable()
export class ApiTermRepository implements ITermRepository {
  async getTerm(id: number): Promise<Term | null> {
    try {
      const response = await apiClient.get<ApiResponse<TermResponseDto>>(
        `${API_PREFIX}/term/${id}`,
      );
      const dto = response.data.data;

      return {
        id: dto.id,
        name: dto.name,
        startDate: dto.startDate,
        endDate: dto.endDate,
      };
    } catch (error) {
      console.error("Failed to fetch term:", error);
      return null;
    }
  }
}

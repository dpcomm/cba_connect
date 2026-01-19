import { Consent } from "@domain/consent/Consent";
import { IConsentRepository } from "@domain/consent/IConsentRepository";
import { API_PREFIX, apiClient } from "@shared/api/client";
import { injectable } from "tsyringe";

interface ConsentApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Consent | Consent[];
}

@injectable()
export class ConsentRepository implements IConsentRepository {
  async getConsent(
    userId: number,
    consentType: string,
  ): Promise<Consent | null> {
    console.log("ConsentRepository: Fetching consent...", {
      userId,
      consentType,
    });
    try {
      const response = await apiClient.get<ConsentApiResponse>(
        `${API_PREFIX}/consent/${userId}/${consentType}`,
      );
      console.log("ConsentRepository: Fetched consent:", response.data);
      return response.data.data as Consent;
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.log("ConsentRepository: Consent not found (404)");
        return null;
      }
      throw error;
    }
  }

  async submitConsent(consentType: string, value: boolean): Promise<Consent> {
    console.log("ConsentRepository: Submitting consent...", {
      consentType,
      value,
    });
    const response = await apiClient.post<ConsentApiResponse>(
      `${API_PREFIX}/consent`,
      {
        consentType,
        value,
      },
    );
    console.log("ConsentRepository: Submit success:", response.data);
    return response.data.data as Consent;
  }
}

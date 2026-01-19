import { Consent } from "./Consent";

export interface IConsentRepository {
  getConsent(userId: number, consentType: string): Promise<Consent | null>;
  submitConsent(consentType: string, value: boolean): Promise<Consent>;
}

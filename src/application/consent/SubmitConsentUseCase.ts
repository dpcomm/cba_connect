import { Consent } from "@domain/consent/Consent";
import { IConsentRepository } from "@domain/consent/IConsentRepository";
import { inject, injectable } from "tsyringe";

const CURRENT_PRIVACY_POLICY_VERSION = "PRIVACY_POLICY_20260119";

@injectable()
export class SubmitConsentUseCase {
  constructor(
    @inject("ConsentRepository") private consentRepository: IConsentRepository,
  ) {}

  /**
   * 현재 버전의 개인정보 처리방침에 동의합니다.
   */
  async execute(): Promise<Consent> {
    return this.consentRepository.submitConsent(
      CURRENT_PRIVACY_POLICY_VERSION,
      true,
    );
  }
}

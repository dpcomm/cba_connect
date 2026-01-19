import { IConsentRepository } from "@domain/consent/IConsentRepository";
import { IUserRepository } from "@domain/user/IUserRepository";
import { inject, injectable } from "tsyringe";

const CURRENT_PRIVACY_POLICY_VERSION = "PRIVACY_POLICY_20260119";

@injectable()
export class CheckConsentUseCase {
  constructor(
    @inject("ConsentRepository") private consentRepository: IConsentRepository,
    @inject("UserRepository") private userRepository: IUserRepository,
  ) {}

  /**
   * 현재 버전의 개인정보 처리방침 동의 여부를 확인합니다.
   * @returns true if consented to current version, false otherwise
   */
  async execute(): Promise<boolean> {
    try {
      console.log("CheckConsentUseCase: Checking consent...");

      // 현재 로그인된 유저 정보 가져오기
      const user = await this.userRepository.getMe();
      if (!user) {
        console.log("CheckConsentUseCase: No user found, returning false");
        return false;
      }

      console.log("CheckConsentUseCase: User id:", user.id);
      const consent = await this.consentRepository.getConsent(
        user.id,
        CURRENT_PRIVACY_POLICY_VERSION,
      );

      console.log("CheckConsentUseCase: Consent result:", consent);
      const isConsented = consent !== null && consent.value === true;
      console.log("CheckConsentUseCase: isConsented:", isConsented);

      return isConsented;
    } catch (error: any) {
      console.log("CheckConsentUseCase: Error occurred:", error.message);
      throw error;
    }
  }
}

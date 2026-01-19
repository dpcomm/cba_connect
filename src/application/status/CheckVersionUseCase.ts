import { StatusRepository } from "@infrastructure/status/StatusRepository";
import Constants from "expo-constants";
import { inject, injectable } from "tsyringe";

export interface VersionCheckResult {
  isUpdateNeeded: boolean;
  currentVersion: string;
  latestVersion: string;
  updateUrl: string;
}

@injectable()
export class CheckVersionUseCase {
  constructor(
    @inject("StatusRepository") private statusRepository: StatusRepository,
  ) {}

  async execute(): Promise<VersionCheckResult> {
    const appVersion = await this.statusRepository.getApplicationVersion();

    // expo-constants에서 현재 앱 버전 가져오기
    const currentVersion = Constants.expoConfig?.version ?? "0.0.0";
    const latestVersion = appVersion.versionName;

    // 단순 문자열 비교 (버전이 다르면 업데이트 필요)
    const isUpdateNeeded = currentVersion !== latestVersion;

    return {
      isUpdateNeeded,
      currentVersion,
      latestVersion,
      updateUrl: appVersion.updateUrl,
    };
  }
}

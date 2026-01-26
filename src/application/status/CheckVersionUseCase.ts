import { StatusRepository } from "@infrastructure/status/StatusRepository";
import Constants from "expo-constants";
import { Platform } from "react-native";
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
    const systemConfig = await this.statusRepository.getSystemConfig();
    const appVersion = systemConfig.application;

    const currentVersion = Constants.expoConfig?.version ?? "0.0.0";
    const latestVersion = appVersion.versionName;

    const isUpdateNeeded = currentVersion !== latestVersion;

    const updateUrl = Platform.select({
      ios: "https://apps.apple.com/kr/app/cba-connect/id6747623245",
      android:
        "https://play.google.com/store/apps/details?id=com.cba.cba_connect_application",
      default: "",
    });

    return {
      isUpdateNeeded,
      currentVersion,
      latestVersion,
      updateUrl,
    };
  }
}

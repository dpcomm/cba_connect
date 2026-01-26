export interface ApplicationConfig {
  name: string;
  versionName: string;
  versionCode: number;
}

export interface PrivacyPolicyConfig {
  url: string;
  version: number;
}

export interface ConsentsConfig {
  privacyPolicy: PrivacyPolicyConfig;
}

export interface SystemConfig {
  application: ApplicationConfig;
  consents: ConsentsConfig;
  currentTermId: number;
  currentRetreatId: number;
}

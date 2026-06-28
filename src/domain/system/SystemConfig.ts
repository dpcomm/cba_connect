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

export interface CurrentTermConfig {
  id: number;
  name: string;
}

export interface CurrentRetreatConfig {
  id: number;
  title: string;
  location: string;
  address: string;
  retreatStartAt: string;
  retreatEndAt: string;
}

export interface SystemConfig {
  application: ApplicationConfig;
  consents: ConsentsConfig;
  currentTermId: number;
  currentRetreatId: number;
  currentTerm: CurrentTermConfig | null;
  currentRetreat: CurrentRetreatConfig | null;
}

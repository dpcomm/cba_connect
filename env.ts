import Constants from "expo-constants";

type Extra = {
  KAKAO_REST_API_KEY?: string;
};

function getExtra(): Extra {
  const extra =
    (Constants.expoConfig?.extra as any) ??
    ((Constants as any).manifest?.extra as any) ??
    ((Constants as any).manifest2?.extra as any) ??
    {};
  return extra as Extra;
}

export function getKakaoRestApiKey(): string {
  return (getExtra().KAKAO_REST_API_KEY ?? "").trim();
}

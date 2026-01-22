import axios from 'axios';
import Constants from 'expo-constants';

export type AddressResult = {
  address: string;
  lat: number;
  lng: number;
};

/**
 * ✅ 프로덕션에서 Constants.expoConfig 가 비는 케이스가 있어서
 * Constants.expoConfig / Constants.manifest / Constants.manifest2 를 순서대로 안전하게 확인한다.
 * (환경별로 값이 들어있는 위치가 다를 수 있음)
 */
function getKakaoKey(): string {
  const extra =
    // SDK / 환경에 따라 expoConfig가 없을 수 있음
    (Constants.expoConfig?.extra as any) ??
    // 구버전 manifest 경로
    ((Constants as any).manifest?.extra as any) ??
    // EAS Updates(신형) manifest 경로
    ((Constants as any).manifest2?.extra as any) ??
    {};

  const key = extra?.KAKAO_REST_API_KEY as string | undefined;

  if (!key || !key.trim()) {
    // 여기서 바로 터지면 원인 추적이 어려우니까 메시지를 상세하게
    throw new Error(
      [
        'KAKAO_REST_API_KEY is missing in app config extra.',
        'Check:',
        '1) app.config.ts -> extra.KAKAO_REST_API_KEY is set',
        '2) EAS Secrets/Environment variables has KAKAO_REST_API_KEY for the build profile',
        '3) Build is rebuilt after changing secrets',
      ].join(' ')
    );
  }

  return key.trim();
}

export async function searchAddresses(query: string): Promise<AddressResult[]> {
  const q = query.trim();
  if (!q) return [];

  const KAKAO_REST_API_KEY = getKakaoKey();

  const { data } = await axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
    params: { query: q, size: 15 },
    headers: {
      Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
    },
    // 네트워크가 불안하면 앱이 멈춘 것처럼 보여서 타임아웃 넣는 게 좋음
    timeout: 10000,
  });

  return (data?.documents ?? []).map((e: any) => ({
    address: e?.address_name ?? '',
    lat: Number.parseFloat(e?.y) || 0,
    lng: Number.parseFloat(e?.x) || 0,
  }));
}

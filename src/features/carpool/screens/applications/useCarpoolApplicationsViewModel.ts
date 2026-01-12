import { useRouter } from 'expo-router';
import { useMemo } from 'react';

type ApplicationItem = {
  id: string;
  driverName: string;
  summary: string;
};

export function useCarpoolApplicationsViewModel() {
  const router = useRouter();

  // TODO: API 연결 전 임시 데이터
  const items: ApplicationItem[] = useMemo(
    () => [
      { id: 'a1', driverName: '김호준', summary: '1/30(금) 저녁 8시 | 신도림역 → 수련회' },
      { id: 'a2', driverName: '김호준', summary: '2/1(주일) 저녁 8시 | 수련회 → 신도림역' },
    ],
    []
  );

  const goBack = () => router.back();

  return { items, goBack };
}

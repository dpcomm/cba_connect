import { useAuthStore } from '@shared/stores/useAuthStore';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';

type CarpoolHistoryItem = {
  id: string;
  date: string;         // 2025.05.05
  roleLabel: '드라이버' | '게스트';
  meetPlace: string;
  meetTime: string;     // PM 7:00
  seatsText: string;    // 1/3
  destination: string;
};

export function useCarpoolHistoryViewModel() {
  const router = useRouter();
  const { user } = useAuthStore(); // user?.id 사용 예정

  const items: CarpoolHistoryItem[] = useMemo(
    () => [
      {
        id: 'h1',
        date: '2025.05.05',
        roleLabel: '드라이버',
        meetPlace: '강남역 11번 출구 앞',
        meetTime: 'PM 7:00',
        seatsText: '1/3',
        destination: '딱따구리 수련원',
      },
      {
        id: 'h2',
        date: '2025.05.05',
        roleLabel: '게스트',
        meetPlace: '강남역 11번 출구 앞',
        meetTime: 'PM 7:00',
        seatsText: '1/3',
        destination: '딱따구리 수련원',
      },
    ],
    []
  );

  // TODO: API 연결 시 예시
  // useEffect(() => {
  //   if (!user?.id) return;
  //   fetchHistory(user.id)
  // }, [user?.id]);

  const goBack = () => router.back();

  return { items, goBack };
}

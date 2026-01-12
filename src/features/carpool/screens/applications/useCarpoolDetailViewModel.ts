import { useRouter } from 'expo-router';
import { useMemo } from 'react';

export function useCarpoolDetailViewModel() {
  const router = useRouter();

  const titleName = '김OO';

  const profile = {
    name: '김OO',
    sub: '010-0000-0000 | 그랜저(검정) | 25가0711',
    phone: '01000000000',
  };

  const info = useMemo(
    () => [
      { key: 'time', icon: '🧑', text: '6월 17일 저녁 6시 출발' },
      { key: 'capacity', icon: '👥', text: '현재 2명 / 정원 3명' },
      { key: 'start', icon: '📍', text: '출발 위치', subText: '서울특별시 강남구 테헤란로 311' },
      { key: 'memo', icon: '⚡', text: '늦지않았으면 좋겠어요.', subText: '주차 시 번호 남겨주세요.' },
    ],
    []
  );

  const goBack = () => router.back();

  const callDriver = () => {
    // TODO: 실제 구현 시
    // Linking.openURL(`tel:${profile.phone}`);
  };

  return { titleName, profile, info, goBack, callDriver };
}

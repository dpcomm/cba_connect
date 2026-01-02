import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';

type Tab = 'HOME' | 'RETREAT';

type ApplicationPreview = {
  id: string;
  driverName: string;
  summary: string;
};

type CarpoolPostItem = {
  id: string;
  driverName: string;
  timeText: string;
  placeText: string;
  routeText: string;
  isClosed: boolean;
};

export function useCarpoolHomeViewModel() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<Tab>('HOME');
  const [query, setQuery] = useState('');

  // TODO: API 연결 전 임시 데이터
  const applicationsPreview: ApplicationPreview[] = useMemo(
    () => [
      { id: 'a1', driverName: '김호준', summary: '1/30(금) 저녁 8시 | 신도림역 → 수련회' },
      { id: 'a2', driverName: '김호준', summary: '2/1(주일) 저녁 8시 | 수련회 → 신도림역' },
    ],
    []
  );

  // 탭/검색에 따라 필터하는 척만(실제는 API)
  const posts: CarpoolPostItem[] = useMemo(() => {
    const all: CarpoolPostItem[] = [
      {
        id: '101',
        driverName: '박OO',
        timeText: '1/30(금) 저녁 8시',
        placeText: '신도림역 2번 출구 앞',
        routeText: '신도림역 | 👥 2/4 | 🚙 카니발(검은색)',
        isClosed: false,
      },
      {
        id: '102',
        driverName: '김OO',
        timeText: '1/31(토) 저녁 1시',
        placeText: '구로역 도착 시 전화',
        routeText: '구로역 | 👥 3/3 | 🚙 모닝(흰색)',
        isClosed: true,
      },
      {
        id: '103',
        driverName: '구OO',
        timeText: '1/30(금) 저녁 7시',
        placeText: '교회 도착 시 전화',
        routeText: '교회 | 👥 2/3 | 🚙 소나타(흰색)',
        isClosed: false,
      },
    ];

    // query로 간단 필터
    const q = query.trim().toLowerCase();
    const filtered = q
      ? all.filter((p) => (p.driverName + p.placeText + p.routeText).toLowerCase().includes(q))
      : all;

    // activeTab은 나중에 서버 파라미터로 쓰면 됨
    return filtered;
  }, [query, activeTab]);

  const goBack = () => router.back();
  const goApplications = () => router.push('/carpool/applications');
  const goRegister = () => router.push('/carpool/register');
//   const goDetail = (id: string) => router.push(`/carpool/${id}`);

//   const applyToPost = (id: string) => {
//     // TODO: 신청 API 호출
//     // 지금은 상세로 보내도 되고(확인 화면), 바로 신청 처리해도 됨
//     router.push(`/carpool/${id}`);
//   };

  return {
    applicationsPreview,
    posts,
    activeTab,
    setActiveTab,
    query,
    setQuery,
    goBack,
    goApplications,
    goRegister,
    // goDetail,
    // applyToPost,
  };
}

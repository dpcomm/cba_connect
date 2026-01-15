import { FindMyCarpoolsUseCase } from '@application/carpool';
import { Carpool } from '@domain/carpool/Carpool';
import { container } from '@shared/di/container';
import { useAuthStore } from '@shared/stores/useAuthStore';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';

type UiItem = {
  id: number;
  isDriver: boolean;
  dateText: string;
  timeText: string;
  seatText: string;
  originDisplay: string;
  destDisplay: string;
};

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function formatKoreanDateTime(iso?: string | null): string {
  if (!iso) return '-';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '-';

  const m = d.getMonth() + 1;
  const day = d.getDate();

  // ✅ 일요일은 '주일'
  const weekdayMap = ['주일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdayMap[d.getDay()];

  const hour = d.getHours();
  const hour12 = ((hour + 11) % 12) + 1;

  // ✅ 스샷 요구: "저녁 8시" (단순 규칙)
  // - 0~11: 오전
  // - 12~23: 저녁
  const ampm = hour < 12 ? '오전' : '저녁';

  return `${m}/${day}(${weekday}) ${ampm} ${hour12}시`;
}

function formatTimeAmPm(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${ampm} ${hh}:${pad2(m)}`;
}

export function useCarpoolHistoryViewModel() {
  const router = useRouter();
  const { user } = useAuthStore(); // 너 프로젝트의 auth store 구조에 맞게 userId 가져오는 부분만 맞추면 됨
  const userId = user?.id ?? 0;

  const useCase = useMemo(() => container.resolve(FindMyCarpoolsUseCase), []);
  const [carpools, setCarpools] = useState<Carpool[]>([]);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const res = await useCase.execute(userId);
      setCarpools(res);
    })();
  }, [useCase, userId]);

  const items: UiItem[] = useMemo(() => {
    return carpools.map((c) => {
      const isDriver = c.driverId === userId;

      const originDisplay = c.originDetailed?.trim() ? c.originDetailed : c.origin;
      const destDisplay = c.destinationDetailed?.trim() ? c.destinationDetailed : c.destination;

      const boarded = (c.seatsTotal ?? 0) - (c.seatsLeft ?? 0);
      const seatText = `${boarded}/${c.seatsTotal}`;

      return {
        id: c.id,
        isDriver,
        dateText: formatKoreanDateTime(c.departureTime),
        timeText: formatTimeAmPm(c.departureTime),
        seatText,
        originDisplay,
        destDisplay,
      };
    });
  }, [carpools, userId]);

  const onPressItem = (carpoolId: number) => {
    router.push(`/carpool/${carpoolId}`);
  };

  return { items, onPressItem };
}

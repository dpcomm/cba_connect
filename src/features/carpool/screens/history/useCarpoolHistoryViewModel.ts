import { FindMyCarpoolsUseCase } from '@application/carpool';
import { Carpool } from '@domain/carpool/Carpool';
import { container } from '@shared/di/container';
import { useAuthStore } from '@shared/stores/useAuthStore';
import { formatDateKorean, formatTime24 } from '@shared/utils/dateFormat';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';

export type CarpoolStatus = 'before_departure' | 'in_transit' | 'arrived';

type UiItem = {
  id: number;
  isDriver: boolean;
  status: CarpoolStatus;
  statusLabel: string;
  dateText: string;
  timeText: string;
  seatText: string;
  originDisplay: string;
  destDisplay: string;
};

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function statusToLabel(status?: string | null): { status: CarpoolStatus; label: string } {
  const s = (status ?? 'before_departure') as CarpoolStatus;
  switch (s) {
    case 'before_departure':
      return { status: 'before_departure', label: '출발 전' };
    case 'in_transit':
      return { status: 'in_transit', label: '이동 중' };
    case 'arrived':
      return { status: 'arrived', label: '도착' };
    default:
      return { status: 'before_departure', label: '출발 전' };
  }
}

export function useCarpoolHistoryViewModel() {
  const router = useRouter();
  const { user } = useAuthStore();
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
      const destDisplay = c.destinationDetailed?.trim()
        ? c.destinationDetailed
        : c.destination;

      const boarded = (c.seatsTotal ?? 0) - (c.seatsLeft ?? 0);
      const seatText = `${boarded}/${c.seatsTotal}`;

      // Carpool 엔티티에 status가 있다고 가정 (없으면 before_departure로 처리)
      const { status, label: statusLabel } = statusToLabel((c as any).status);

      return {
        id: c.id,
        isDriver,
        status,
        statusLabel,
        dateText: formatDateKorean(c.departureTime),
        timeText: formatTime24(c.departureTime),
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

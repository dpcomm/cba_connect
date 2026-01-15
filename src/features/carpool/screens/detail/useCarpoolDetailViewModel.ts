import { container } from '@shared/di/container';
import { useCallback, useMemo, useState } from 'react';

import {
  GetCarpoolDetailUseCase,
  JoinCarpoolUseCase,
  LeaveCarpoolUseCase,
} from '@application/carpool';

type Args = { carpoolId: number; userId: number };

export function useCarpoolDetailViewModel({ carpoolId, userId }: Args) {
  const getDetailUseCase = useMemo(() => container.resolve(GetCarpoolDetailUseCase), []);
  const joinUseCase = useMemo(() => container.resolve(JoinCarpoolUseCase), []);
  const leaveUseCase = useMemo(() => container.resolve(LeaveCarpoolUseCase), []);

  const [carpool, setCarpool] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const load = useCallback(async () => {
    if (!carpoolId) return;
    setIsLoading(true);

    try {
      const detail = await getDetailUseCase.execute(carpoolId);
      setCarpool(detail);
    } catch (e) {
      console.log('[carpool detail load error]', e);
      setCarpool(null);
      // 필요하면 Alert 띄우기
      // Alert.alert('오류', e instanceof Error ? e.message : '상세 정보를 불러오지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [carpoolId, getDetailUseCase]);


  const isDriver = !!carpool && carpool.driverId === userId;

  // 서버에서 members가 내려오면 그걸로, 아니면 current user membership boolean 내려오는 형태로 맞추면 됨
  const isMember = useMemo(() => {
    if (!carpool) return false;
    if (typeof carpool.isMember === 'boolean') return carpool.isMember;

    // ✅ detail 응답이 members: [{ id, name, phone }] 형태로 내려옴
    if (Array.isArray(carpool.members)) return carpool.members.some((m: any) => m.id === userId);

    return false;
  }, [carpool, userId]);

  const join = useCallback(async () => {
    if (!carpoolId) return;
    setIsLoading(true);
    try {
      await joinUseCase.execute(carpoolId, userId);
      await load();
    } finally {
      setIsLoading(false);
    }
  }, [carpoolId, userId, joinUseCase, load]);

  const leave = useCallback(async () => {
    if (!carpoolId) return;
    setIsLoading(true);
    try {
      await leaveUseCase.execute(carpoolId, userId);
      await load();
    } finally {
      setIsLoading(false);
    }
  }, [carpoolId, userId, leaveUseCase, load]);

  return {
    carpool,
    isLoading,
    isDriver,
    isMember,
    load,
    join,
    leave,
  };
}

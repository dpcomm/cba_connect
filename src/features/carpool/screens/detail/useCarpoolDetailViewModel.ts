import { container } from '@shared/di/container';
import { useCallback, useMemo, useState } from 'react';

import {
  DeleteCarpoolUseCase,
  GetCarpoolDetailUseCase,
  JoinCarpoolUseCase,
  LeaveCarpoolUseCase,
} from '@application/carpool';
import { router } from 'expo-router';
import { Alert } from 'react-native';

type Args = { carpoolId: number; userId: number };

export function useCarpoolDetailViewModel({ carpoolId, userId }: Args) {
  const getDetailUseCase = useMemo(() => container.resolve(GetCarpoolDetailUseCase), []);
  const joinUseCase = useMemo(() => container.resolve(JoinCarpoolUseCase), []);
  const leaveUseCase = useMemo(() => container.resolve(LeaveCarpoolUseCase), []);
  const deleteUseCase = useMemo(() => container.resolve(DeleteCarpoolUseCase), []);

  const [carpool, setCarpool] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const load = useCallback(async () => {
    if (!carpoolId) return;
    setIsLoading(true);

    try {
      const detail = await getDetailUseCase.execute(carpoolId);
      setCarpool(detail);
      console.log(detail);
    } catch (e) {
      console.log('[carpool detail load error]', e);
      setCarpool(null);
      Alert.alert('오류', e instanceof Error ? e.message : '상세 정보를 불러오지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [carpoolId, getDetailUseCase]);


  const isDriver = !!carpool && carpool.driverId === userId;

  const isMember = useMemo(() => {
    if (!carpool) return false;
    if (typeof carpool.isMember === 'boolean') return carpool.isMember;

    if (Array.isArray(carpool.members)) return carpool.members.some((m: any) => m.id === userId);

    return false;
  }, [carpool, userId]);

  const join = useCallback(async () => {
    if (!carpoolId) return;

    if (!userId || userId <= 0) {
      Alert.alert('오류', '로그인 정보를 찾을 수 없습니다.');
      return;
    }

    Alert.alert('신청', '신청하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '확인',
        onPress: async () => {
          setIsLoading(true);
          try {
            await joinUseCase.execute(userId, carpoolId);
            await load();

            // ✅ 여기
            Alert.alert('완료', '카풀 신청이 완료되었습니다.');
          } catch (e) {
            Alert.alert(
              '오류',
              e instanceof Error ? e.message : '신청에 실패했습니다.'
            );
          } finally {
            setIsLoading(false);
          }
        },
      },
    ]);
  }, [carpoolId, userId, joinUseCase, load]);


  const leave = useCallback(async () => {
    if (!carpoolId) return;

    if (!userId || userId <= 0) {
      Alert.alert('오류', '로그인 정보를 찾을 수 없습니다.');
      return;
    }

    Alert.alert('취소', '정말 취소할까요?', [
      { text: '아니요', style: 'cancel' },
      {
        text: '예',
        onPress: async () => {
          setIsLoading(true);
          try {
            await leaveUseCase.execute(userId, carpoolId);
            await load();

            // ✅ 여기
            Alert.alert('완료', '카풀 신청이 취소되었습니다.');
          } catch (e) {
            Alert.alert(
              '오류',
              e instanceof Error ? e.message : '취소에 실패했습니다.'
            );
          } finally {
            setIsLoading(false);
          }
        },
      },
    ]);
  }, [carpoolId, userId, leaveUseCase, load]);

  const toEdit = (carpoolId: number) => {
    let message = '';
    if (carpool.members && carpool.members.length > 1) {
      message = "카풀 신청자가 있습니다. 정말로 수정 하시겠습니까? \n탑승자에게는 수정 알림이 발송됩니다."
    } else {
      message = "정말로 수정 하시겠습니까?"
    }
    Alert.alert('수정', message, [
      { text: '아니요', style: 'cancel' },
      {
        text: '예',
        onPress: async () => {
          router.push(`/carpool/edit/${carpoolId}`);
        },
      },
    ]);
  };

  const deleteCarpool = useCallback(async () => {
    if (!carpoolId) return;

    if (!userId || userId <= 0) {
      Alert.alert('오류', '로그인 정보를 찾을 수 없습니다.');
      return;
    }

    let message = '';
    if (carpool.members && carpool.members.length > 1) {
      message = "카풀 신청자가 있습니다. 정말로 삭제 하시겠습니까? \n탑승자에게는 삭제 알림이 발송됩니다."
    } else {
      message = "정말로 삭제 하시겠습니까?"
    }
    Alert.alert('취소', message, [
      { text: '아니요', style: 'cancel' },
      {
        text: '예',
        onPress: async () => {
          setIsLoading(true);
          try {
            await deleteUseCase.execute(carpoolId);
            Alert.alert('완료', '카풀이 삭제되었습니다.');
            router.push('/carpool')
          } catch (e) {
            Alert.alert(
              '오류',
              e instanceof Error ? e.message : '삭제에 실패했습니다.'
            );
          } finally {
            setIsLoading(false);
          }
        },
      },
    ]);
  }, [carpoolId, userId, leaveUseCase, load]);

  return {
    carpool,
    isLoading,
    isDriver,
    isMember,
    load,
    join,
    leave,
    toEdit,
    deleteCarpool,
  };
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, View } from 'react-native';

import { BaseModal } from '@shared/components/modal/BaseModal';
import { TextInput } from '@shared/components/text-input/TextInput';
import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';

const STORAGE_KEYS = {
  carInfo: 'carpool.carInfo',
} as const;

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function CarInfoModal({ visible, onClose }: Props) {
  const [cached, setCached] = useState(''); // 저장돼있던 값
  const [draft, setDraft] = useState('');   // 입력 중 값
  const [loading, setLoading] = useState(false);

  const hasCarInfo = useMemo(() => !!cached.trim(), [cached]);

  const canSave = useMemo(() => {
    const d = draft.trim();
    return d.length > 0 && d !== cached.trim();
  }, [draft, cached]);

  // ✅ 모달 열릴 때 로컬 캐시에서 불러오기 (모달 내에서만 처리)
  useEffect(() => {
    if (!visible) return;

    let mounted = true;
    setLoading(true);

    (async () => {
      try {
        const v = await AsyncStorage.getItem(STORAGE_KEYS.carInfo);
        if (!mounted) return;
        const value = v ?? '';
        setCached(value);
        setDraft(value);
      } catch (e) {
        console.error('[CarInfoModal] load failed', e);
        if (!mounted) return;
        setCached('');
        setDraft('');
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [visible]);

  const onPressSave = async () => {
    if (!canSave) return;

    const next = draft.trim();

    try {
      await AsyncStorage.setItem(STORAGE_KEYS.carInfo, next);
      setCached(next);
      onClose();
    } catch (e) {
      console.error('[CarInfoModal] save failed', e);
      Alert.alert('저장 실패', '차 정보를 저장하지 못했습니다. 다시 시도해주세요.');
    }
  };

  const onChangeDraft = (text: string) => {
    setDraft(text);
  };

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      title="내 차 정보"
      rightButton={{ text: '저장', onPress: onPressSave }}
    >
      <View style={{ paddingTop: Layout.spacing.m }}>

        <ThemedText variant="text2" color={Color.text.sub} style={{ marginBottom: Layout.spacing.s }}>
          차종/색상/차 번호
        </ThemedText>

        <View style={{  paddingBottom: 6 }}>
          <TextInput
            placeholder="예: K9/흰색/11가1111"
            value={draft}
            onChangeText={onChangeDraft as any}
            onChange={(e: any) => onChangeDraft(e?.nativeEvent?.text ?? '')}
            editable={!loading}
          />
        </View>
      </View>
    </BaseModal>
  );
}

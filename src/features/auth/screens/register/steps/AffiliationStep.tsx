import { ReadOnlyStepValue } from '@features/auth/components/ReadOnlyStepValue';
import { SelectBox } from '@shared/components/select-box/SelectBox';
import {
  InlineOption,
  InlineSelectModal,
} from '@shared/components/select-inline/InlineSelectModal';
import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';

interface Props {
  affiliation: string;
  setAffiliation?: (text: string) => void;
  onNext?: () => void;
  readOnly?: boolean;
  options?: InlineOption[];
  loading?: boolean;
}

export function AffiliationStep({
  affiliation,
  setAffiliation,
  onNext,
  readOnly,
  options = [],
  loading = false,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const selectedLabel = useMemo(
    () =>
      options.find((option) => option.value === affiliation)?.label ??
      affiliation ??
      '',
    [affiliation, options],
  );

  if (readOnly) {
    return <ReadOnlyStepValue label="중그룹" value={selectedLabel} />;
  }

  return (
    <View style={{ gap: Layout.spacing.m }}>
      <View style={{ gap: Layout.spacing.s }}>
        <ThemedText variant="text1" color={Color.text.sub}>
          중그룹
        </ThemedText>
        <SelectBox
          value={selectedLabel}
          placeholder={
            loading ? '중그룹 옵션을 불러오는 중입니다' : '중그룹을 선택해주세요'
          }
          disabled={loading || options.length === 0}
          onPress={() => setModalVisible(true)}
        />
      </View>

      <InlineSelectModal
        visible={modalVisible}
        title="중그룹 선택"
        options={options}
        selectedValue={affiliation || undefined}
        onClose={() => setModalVisible(false)}
        onSelect={(option) => {
          setAffiliation?.(option.value);
          onNext?.();
        }}
      />
    </View>
  );
}

import { TextInputLined } from '@shared/components/text-input-lined/TextInputLined';
import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import React from 'react';
import { View } from 'react-native';

interface Props {
  name: string;
  setName?: (text: string) => void;
  onNext?: () => void;
  readOnly?: boolean;
}

export function NameStep({ name, setName, onNext, readOnly }: Props) {
  if (readOnly) {
    return (
      <View style={{ marginBottom: Layout.spacing.l, gap: 10 }}>
        <ThemedText variant="text1" color={Color.text.sub}>이름</ThemedText>
        <ThemedText variant="heading3">{name}</ThemedText>
      </View>
    );
  }

  const handleSubmit = () => {
    if (name.trim().length > 0 && onNext) {
      onNext();
    }
  };

  const handleChangeText = (text: string) => {
    const koreaOnly = text.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
    const limited = koreaOnly.slice(0, 4);
    setName?.(limited);
  };

  return (
    <TextInputLined
      label="이름"
      placeholder="김땡땡"
      value={name}
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmit}
      returnKeyType="next"
      maxLength={4}
    />
  );
}

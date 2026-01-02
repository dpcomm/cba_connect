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
      <View style={{ marginBottom: Layout.spacing.l }}>
        <ThemedText variant="text3" color={Color.text.sub}>이름</ThemedText>
        <ThemedText variant="heading3" style={{ marginTop: Layout.spacing.xs }}>{name}</ThemedText>
      </View>
    );
  }

  const handleSubmit = () => {
    if (name.trim().length > 0 && onNext) {
      onNext();
    }
  };

  return (
    <TextInputLined
      label="이름"
      placeholder="김땡땡"
      value={name}
      onChangeText={setName}
      onSubmitEditing={handleSubmit}
      returnKeyType="next"
    />
  );
}

import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import React from 'react';
import { View } from 'react-native';

interface Props {
  name: string;
  maskedId: string;
  onLogin: () => void;
}

export function FindIdResultView({ name, maskedId, onLogin }: Props) {
  return (
    <View style={{ flex: 1, padding: Layout.spacing.l, backgroundColor: Color.default.background }}>
      <View style={{ alignItems: 'center', marginTop: Layout.spacing.xl }}>
        <ThemedText variant="text1">{name} 회원님의 아이디는</ThemedText>
        <ThemedText variant="text1" color={Color.primary.main} style={{ marginTop: Layout.spacing.xs }}>
          {maskedId}
        </ThemedText>
        <ThemedText variant="text1">입니다.</ThemedText>
      </View>
    </View>
  );
}

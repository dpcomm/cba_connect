import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import React from 'react';
import { View } from 'react-native';

interface Props {
  name: string;
  maskedIds: string[];
  onLogin: () => void;
}

export function FindIdResultView({ name, maskedIds, onLogin }: Props) {
  return (
    <View style={{ flex: 1, padding: Layout.spacing.l, backgroundColor: Color.default.background }}>
      <View style={{ alignItems: 'center', marginTop: Layout.spacing.xl }}>
        <ThemedText variant="text1">{name} 회원님의 아이디는</ThemedText>
        {maskedIds.map((id, index) => (
          <ThemedText
            key={index}
            variant="text1"
            color={Color.primary.main}
            style={{ marginTop: Layout.spacing.xs }}
          >
            {id}
          </ThemedText>
        ))}
        <ThemedText variant="text1" style={{ marginTop: Layout.spacing.xs }}>입니다.</ThemedText>
      </View>
    </View>
  );
}

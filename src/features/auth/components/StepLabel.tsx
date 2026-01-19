import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import React from 'react';
import { View } from 'react-native';

interface StepLabelProps {
  label: string;
  subLabel?: string;
}

export function StepLabel({ label, subLabel }: StepLabelProps) {
  if (subLabel) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 10 }}>
        <ThemedText variant="text1" color={Color.text.sub}>
          {label}
        </ThemedText>
        <ThemedText variant="text5" color={Color.text.sub}>
          {subLabel}
        </ThemedText>
      </View>
    );
  }

  return (
    <View style={{ marginBottom: 10 }}>
      <ThemedText variant="text1" color={Color.text.sub}>
        {label}
      </ThemedText>
    </View>
  );
}

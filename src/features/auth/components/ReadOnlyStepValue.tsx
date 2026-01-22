import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import React, { ReactNode } from 'react';
import { View } from 'react-native';

interface ReadOnlyStepValueProps {
  label: string;
  value?: string | ReactNode;
  children?: ReactNode;
}

export function ReadOnlyStepValue({ label, value, children }: ReadOnlyStepValueProps) {
  return (
    <View style={{ marginBottom: Layout.spacing.m, gap: 10 }}>
      <ThemedText variant="text1" color={Color.text.sub}>
        {label}
      </ThemedText>
      {value && typeof value === 'string' ? (
        <ThemedText variant="heading3">{value}</ThemedText>
      ) : value ? (
        value
      ) : children ? (
        children
      ) : null}
    </View>
  );
}

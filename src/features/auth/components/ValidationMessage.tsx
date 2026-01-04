import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import React from 'react';

interface ValidationMessageProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

export function ValidationMessage({ message, type }: ValidationMessageProps) {
  const getColor = () => {
    switch (type) {
      case 'success':
        return Color.primary.main;
      case 'error':
        return Color.accents.pink;
      case 'info':
        return Color.text.sub;
    }
  };

  return (
    <ThemedText 
      variant="text4" 
      color={getColor()}
      style={{ marginTop: Layout.spacing.xs }}
    >
      {message}
    </ThemedText>
  );
}

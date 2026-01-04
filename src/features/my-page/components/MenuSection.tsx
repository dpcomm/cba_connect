import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import React from 'react';
import { View } from 'react-native';

export function MenuSection({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <View>
      {title && (
        <ThemedText 
          variant="heading2" 
          color={Color.text.main} 
          style={{ marginBottom: 9 }}
        >
          {title}
        </ThemedText>
      )}
      <View style={{
        backgroundColor: Color.secondary.main,
        borderRadius: 8,
        ...Layout.shadow.default,
      }}>
        {children}
      </View>
    </View>
  );
}

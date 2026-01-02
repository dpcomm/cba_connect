import { ThemedText } from '@shared/components/themed-text/ThemedText';
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';

export default function CarpoolHistoryScreen() {
  return (
    <View style={styles.container}>
      <ThemedText variant="heading1">카풀 히스토리 페이지</ThemedText>
    </View>
  );
}

import { ThemedText } from '@shared/components/themed-text/ThemedText';
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <ThemedText variant="heading1">회원가입 페이지</ThemedText>
    </View>
  );
}

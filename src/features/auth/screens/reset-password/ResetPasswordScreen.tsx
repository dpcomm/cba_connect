import { ThemedText } from '@shared/components/themed-text/ThemedText';
import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';

export default function ResetPasswordScreen() {
  return (
    <View style={styles.container}>
      <ThemedText variant="heading1">비밀번호 재설정 페이지</ThemedText>
    </View>
  );
}

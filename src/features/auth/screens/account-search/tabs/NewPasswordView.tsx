import { TextInput } from '@shared/components/text-input/TextInput';
import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import React from 'react';
import { View } from 'react-native';

interface Props {
  newPassword: string;
  setNewPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
}

export function NewPasswordView({ 
  newPassword, 
  setNewPassword, 
  confirmPassword, 
  setConfirmPassword 
}: Props) {
  const isPasswordValid = newPassword.length >= 8;
  const isConfirmMatch = newPassword === confirmPassword && confirmPassword.length > 0;

  return (
    <View style={{ flex: 1, padding: Layout.spacing.l, backgroundColor: Color.default.background }}>
      <TextInput
        placeholder="새 비밀번호 입력"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        containerStyle={{ marginBottom: Layout.spacing.m }}
      />
      
      <TextInput
        placeholder="새 비밀번호 재 입력"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        containerStyle={{ marginBottom: Layout.spacing.m }}
      />

      <View>
        <ThemedText variant="text3" color={Color.text.sub}>• 8자리 이상 입력(영문/숫자)</ThemedText>
        <ThemedText 
          variant="text3" 
          color={isPasswordValid ? Color.primary.main : '#FF3B30'}
        >
          • {isPasswordValid ? '사용가능한 비밀번호입니다.' : '사용 불가능한 비밀번호입니다.'}
        </ThemedText>
        {confirmPassword.length > 0 && (
          <ThemedText 
            variant="text3" 
            color={isConfirmMatch ? Color.primary.main : '#FF3B30'}
          >
            • {isConfirmMatch ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
          </ThemedText>
        )}
      </View>
    </View>
  );
}

import { TextInput } from '@shared/components/text-input/TextInput';
import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import React from 'react';
import { View } from 'react-native';

interface EmailInputStepProps {
  email: string;
  setEmail: (value: string) => void;
}

export function EmailInputStep({ email, setEmail }: EmailInputStepProps) {
  return (
    <View style={{ flex: 1, padding: Layout.spacing.l, backgroundColor: Color.default.background }}>
      <ThemedText variant="text1" style={{ color: Color.text.main, marginBottom: 6 }}>
        인증번호를 받을 이메일 주소를 입력해 주세요.
      </ThemedText>

      <TextInput
        placeholder="이메일 입력"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
    </View>
  );
}

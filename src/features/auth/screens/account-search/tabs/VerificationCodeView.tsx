import { TextInput } from '@shared/components/text-input/TextInput';
import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

interface Props {
  email: string;
  verificationCode: string;
  setVerificationCode: (value: string) => void;
  onResend: () => void;
  onVerify: () => void;
}

export function VerificationCodeView({ 
  email, 
  verificationCode, 
  setVerificationCode, 
  onResend, 
  onVerify 
}: Props) {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResend = () => {
    setTimeLeft(300);
    onResend();
  };

  return (
    <View style={{ flex: 1, padding: Layout.spacing.l, backgroundColor: Color.default.background }}>
      <ThemedText variant="heading3" style={{ marginBottom: Layout.spacing.xs }}>
        인증번호가 이메일로 전송되었습니다.
      </ThemedText>
      <ThemedText variant="heading3" style={{ marginBottom: Layout.spacing.l }}>
        6자리를 입력하세요.
      </ThemedText>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Layout.spacing.m }}>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder="인증번호 입력"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="number-pad"
            maxLength={6}
          />
        </View>
        <TouchableOpacity
          onPress={handleResend}
          style={{
            backgroundColor: Color.primary.main,
            paddingVertical: Layout.spacing.s,
            paddingHorizontal: Layout.spacing.m,
            borderRadius: Layout.radius.m,
            marginLeft: Layout.spacing.s,
          }}
        >
          <ThemedText variant="text2" color={Color.text.white}>재전송</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: Layout.spacing.l }}>
        <ThemedText variant="text3" color={Color.text.sub}>• 메일이 보이지 않으면 스팸함을 확인해주세요</ThemedText>
        <ThemedText variant="text3" color={Color.text.sub}>• 5분 내 도착하지 않으면 다시 요청해주세요</ThemedText>
        <ThemedText variant="text3" color={Color.primary.main}>• 남은 유효시간 {formatTime(timeLeft)}</ThemedText>
      </View>
    </View>
  );
}

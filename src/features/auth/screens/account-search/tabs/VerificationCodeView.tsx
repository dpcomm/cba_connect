import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import React from 'react';
import { View } from 'react-native';
import { VerificationCodeForm } from '../../../components/VerificationCodeForm';

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
  return (
    <View style={{ flex: 1, padding: Layout.spacing.l, backgroundColor: Color.default.background }}>
      <VerificationCodeForm
        verificationCode={verificationCode}
        setVerificationCode={setVerificationCode}
        onResend={onResend}
      />
    </View>
  );
}


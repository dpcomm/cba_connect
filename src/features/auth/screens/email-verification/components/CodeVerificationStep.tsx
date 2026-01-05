import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import React from 'react';
import { View } from 'react-native';
import { VerificationCodeForm } from '../../../components/VerificationCodeForm';

interface CodeVerificationStepProps {
  verificationCode: string;
  setVerificationCode: (value: string) => void;
  onResend: () => void;
}

export function CodeVerificationStep({ 
  verificationCode, 
  setVerificationCode, 
  onResend 
}: CodeVerificationStepProps) {
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

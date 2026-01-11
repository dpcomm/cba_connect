import { Button } from '@shared/components/button/Button';
import { Header } from '@shared/components/header/Header';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CodeVerificationStep } from './components/CodeVerificationStep';
import { EmailInputStep } from './components/EmailInputStep';
import { useEmailVerificationViewModel } from './useEmailVerificationViewModel';

export type EmailVerificationSource = 'register' | 'home' | 'mypage';

export default function EmailVerificationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ source?: EmailVerificationSource }>();
  const source = params.source || 'register';

  const vm = useEmailVerificationViewModel();

  const handleBack = () => {
    if (vm.step === 'verification') {
      vm.goBack();
    } else {
      router.back();
    }
  };

  const handleSubmit = async () => {
    if (vm.step === 'email') {
      await vm.sendVerificationCode();
    } else {
      const success = await vm.verifyCode();
      if (success) {
        // 인증 성공 후 source에 따라 분기
        switch (source) {
          case 'register':
            // 회원가입 완료로 이동
            console.log('Email verified from register flow');
            router.back(); // 회원가입 화면으로 돌아가서 다음 단계 진행
            break;
          case 'home':
            // 홈으로 이동
            console.log('Email verified from home flow');
            router.replace('/home');
            break;
          case 'mypage':
            // 마이페이지로 이동
            console.log('Email verified from mypage flow');
            router.back();
            break;
          default:
            router.back();
        }
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.default.background }} edges={['top']}>
      <Header title="이메일 인증" onBack={handleBack} />
      <View style={{ flex: 1 }}>
        {vm.step === 'email' ? (
          <EmailInputStep
            email={vm.email}
            setEmail={vm.setEmail}
          />
        ) : (
          <CodeVerificationStep
            verificationCode={vm.verificationCode}
            setVerificationCode={vm.setVerificationCode}
            onResend={vm.resendVerificationCode}
          />
        )}
      </View>
      <View style={{ padding: Layout.spacing.l }}>
        <Button
          title={vm.getButtonTitle()}
          onPress={handleSubmit}
          size="large"
          disabled={vm.isSubmitDisabled()}
        />
      </View>
    </SafeAreaView>
  );
}

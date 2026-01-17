import { Button } from '@shared/components/button/Button';
import { Header } from '@shared/components/header/Header';
import { LoadingOverlay } from '@shared/components/loading-overlay/LoadingOverlay';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRegisterStore } from '../../stores/useRegisterStore';
import { CodeVerificationStep } from './components/CodeVerificationStep';
import { EmailInputStep } from './components/EmailInputStep';
import { useEmailVerificationViewModel } from './useEmailVerificationViewModel';

export type EmailVerificationSource = 'register' | 'home' | 'mypage';

export default function EmailVerificationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ source?: EmailVerificationSource }>();
  const source = params.source || 'register';

  const { updateData } = useRegisterStore();
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
      const token = await vm.verifyCode();
      if (token) {
        if (source === 'register') {
           Alert.alert('인증 성공', '이메일 인증이 완료되었습니다.', [
             {
               text: '확인',
               onPress: () => {
                 updateData({ 
                   email: vm.email,
                   verificationToken: token 
                 });
                 console.log('Email verified and saved to store:', vm.email);
                 router.back();
               }
             }
           ]);
        } else {
          switch (source) {
            case 'home':
              router.replace('/home');
              break;
            case 'mypage':
              router.back();
              break;
            default:
              router.back();
          }
        }
      }
    }
  };

  return (
    <>
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.default.background }} edges={['top']}>
      <Header title="이메일 인증" onBack={handleBack} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
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
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
    <LoadingOverlay visible={vm.isLoading} />
    </>
  );
}

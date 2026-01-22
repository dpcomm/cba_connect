import { Button } from '@shared/components/button/Button';
import { Header } from '@shared/components/header/Header';
import { LoadingOverlay } from '@shared/components/loading-overlay/LoadingOverlay';
import { BaseModal } from '@shared/components/modal/BaseModal';
import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRegisterStore } from '../../stores/useRegisterStore';
import { CodeVerificationStep } from './components/CodeVerificationStep';
import { EmailInputStep } from './components/EmailInputStep';
import { useEmailVerificationViewModel } from './useEmailVerificationViewModel';

export type EmailVerificationSource = 'register' | 'home' | 'mypage';

interface ModalState {
  visible: boolean;
  type: 'success' | 'error';
  message: string;
}

export default function EmailVerificationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ source?: EmailVerificationSource }>();
  const source = params.source || 'register';

  const { updateData } = useRegisterStore();
  const vm = useEmailVerificationViewModel(source);
  
  const [modalState, setModalState] = useState<ModalState>({
    visible: false,
    type: 'success',
    message: '',
  });

  const closeModalAndNavigate = () => {
    setModalState({ ...modalState, visible: false });
    router.back();
  };

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
          updateData({
            email: vm.email,
            verificationToken: token
          });
          setModalState({
            visible: true,
            type: 'success',
            message: '이메일 인증이 완료되었습니다.',
          });
        } else if (source === 'mypage') {
          const success = await vm.updateEmail(token);
          if (success) {
            setModalState({
              visible: true,
              type: 'success',
              message: '이메일이 등록되었습니다.',
            });
          }
        } else {
          router.replace('/home');
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
    
    <BaseModal
      visible={modalState.visible}
      onClose={closeModalAndNavigate}
      title={modalState.type === 'success' ? '성공' : '오류'}
      rightButton={{
        text: '확인',
        onPress: closeModalAndNavigate,
      }}
    >
      <ThemedText variant="text1" color={Color.text.main}>
        {modalState.message}
      </ThemedText>
    </BaseModal>
    </>
  );
}

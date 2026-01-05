import { useState } from 'react';

type Step = 'email' | 'verification';

export function useEmailVerificationViewModel() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (emailValue: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const sendVerificationCode = async () => {
    if (!isValidEmail(email)) {
      console.warn('Invalid email format');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: API 호출 - 이메일로 인증번호 발송
      console.log('Sending verification code to:', email);
      
      // Mock: 성공 시 다음 단계로 이동
      setStep('verification');
    } catch (error) {
      console.error('Failed to send verification code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationCode = async () => {
    setIsLoading(true);
    try {
      // TODO: API 호출 - 인증번호 재발송
      console.log('Resending verification code to:', email);
    } catch (error) {
      console.error('Failed to resend verification code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async (): Promise<boolean> => {
    if (verificationCode.length !== 6) {
      console.warn('Invalid verification code length');
      return false;
    }

    setIsLoading(true);
    try {
      // TODO: API 호출 - 인증번호 확인
      console.log('Verifying code:', verificationCode, 'for email:', email);
      
      // Mock: 성공 처리
      return true;
    } catch (error) {
      console.error('Failed to verify code:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonTitle = () => {
    return step === 'email' ? '인증번호 발송' : '확인';
  };

  const isSubmitDisabled = () => {
    if (step === 'email') {
      return !isValidEmail(email);
    }
    return verificationCode.length !== 6;
  };

  const goBack = () => {
    if (step === 'verification') {
      setStep('email');
      setVerificationCode('');
    }
  };

  return {
    step,
    email,
    setEmail,
    verificationCode,
    setVerificationCode,
    isLoading,
    sendVerificationCode,
    resendVerificationCode,
    verifyCode,
    getButtonTitle,
    isSubmitDisabled,
    goBack,
  };
}

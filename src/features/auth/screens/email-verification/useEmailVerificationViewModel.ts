import { SendEmailVerificationUseCase } from '@application/auth/SendEmailVerificationUseCase';
import { VerifyEmailCodeUseCase } from '@application/auth/VerifyEmailCodeUseCase';
import { EmailVerificationType } from '@domain/auth/EmailVerificationType';
import { container } from '@shared/di/container';
import { useState } from 'react';

type Step = 'email' | 'verification';

export function useEmailVerificationViewModel() {
  const sendEmailVerificationUseCase = container.resolve(SendEmailVerificationUseCase);
  const verifyEmailCodeUseCase = container.resolve(VerifyEmailCodeUseCase);

  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationToken, setVerificationToken] = useState<string | null>(null);
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
      await sendEmailVerificationUseCase.execute(email, EmailVerificationType.REGISTER);
      setStep('verification');
    } catch (error: any) {
      console.error('Failed to send verification code:', error);
      alert(error.message || '인증번호 발송에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationCode = async () => {
    setIsLoading(true);
    try {
      await sendEmailVerificationUseCase.execute(email, EmailVerificationType.REGISTER);
      alert('인증번호가 재발송되었습니다.');
    } catch (error: any) {
      console.error('Failed to resend verification code:', error);
      alert(error.message || '인증번호 재발송에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async (): Promise<string | null> => {
    if (verificationCode.length !== 6) {
      console.warn('Invalid verification code length');
      return null;
    }

    setIsLoading(true);
    try {
      const token = await verifyEmailCodeUseCase.execute(email, verificationCode);
      setVerificationToken(token);
      return token;
    } catch (error: any) {
      console.error('Failed to verify code:', error);
      alert(error.message || '인증번호 확인에 실패했습니다.');
      return null;
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
    verificationToken,
    isLoading,
    sendVerificationCode,
    resendVerificationCode,
    verifyCode,
    getButtonTitle,
    isSubmitDisabled,
    goBack,
  };
}

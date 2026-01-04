import { useState } from 'react';

export type FindAccountTab = 'ID' | 'PW';
export type FindIdStep = 'input' | 'result';
export type FindPwStep = 'input' | 'verification' | 'newPassword';

export function useFindAccountViewModel() {
  const [activeTab, setActiveTab] = useState<FindAccountTab>('ID');
  
  // 아이디 찾기
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [findIdStep, setFindIdStep] = useState<FindIdStep>('input');
  const [foundId, setFoundId] = useState('');
  
  // 비밀번호 찾기
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [findPwStep, setFindPwStep] = useState<FindPwStep>('input');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const findId = async () => {
    setFoundId('----@----');
    setFindIdStep('result');
  };

  const sendVerificationCode = async () => {
    setFindPwStep('verification');
  };

  const resendVerificationCode = async () => {
    console.log('Resend verification code');
  };

  const verifyCode = async () => {
    console.log('Verify code:', verificationCode);
    setFindPwStep('newPassword');
  };

  const resetPassword = async () => {
    console.log('Reset password');
  };

  const submit = () => {
    if (activeTab === 'ID') {
      if (findIdStep === 'input') {
        findId();
      }
    } else {
      if (findPwStep === 'input') {
        sendVerificationCode();
      } else if (findPwStep === 'verification') {
        verifyCode();
      } else if (findPwStep === 'newPassword') {
        resetPassword();
      }
    }
  };

  const getButtonTitle = () => {
    if (activeTab === 'ID') {
      return findIdStep === 'input' ? '아이디 찾기' : '로그인';
    } else {
      if (findPwStep === 'input') return '비밀번호 찾기';
      if (findPwStep === 'verification') return '확인';
      return '로그인 하기';
    }
  };

  const isPasswordValid = newPassword.length >= 8;
  const isConfirmMatch = newPassword === confirmPassword && confirmPassword.length > 0;

  const isSubmitDisabled = () => {
    if (activeTab === 'PW' && findPwStep === 'newPassword') {
      return !isPasswordValid || !isConfirmMatch;
    }
    return false;
  };

  return {
    activeTab,
    setActiveTab,
    name,
    setName,
    phone,
    setPhone,
    findIdStep,
    foundId,
    userId,
    setUserId,
    email,
    setEmail,
    findPwStep,
    verificationCode,
    setVerificationCode,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    resendVerificationCode,
    submit,
    getButtonTitle,
    isSubmitDisabled,
  };
}

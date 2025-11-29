import { LoginUseCase } from '@application/auth/LoginUseCase';
import { container } from '@shared/container';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export function useLoginViewModel() {
  const loginUseCase = container.resolve(LoginUseCase);
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    try {
      setIsLoading(true);
      await loginUseCase.execute(userId, password, autoLogin);
      alert('로그인에 성공하였습니다.');
      router.replace('/home'); // Navigate to home
    } catch (error: any) {
      alert(error.message || '로그인에 실패하였습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToResetPassword = () => {
    router.push('/auth/reset-password');
  };

  const navigateToRegister = () => {
    router.push('/auth/register');
  };

  return {
    userId,
    setUserId,
    password,
    setPassword,
    autoLogin,
    setAutoLogin,
    isLoading,
    login,
    navigateToResetPassword,
    navigateToRegister,
  };
}

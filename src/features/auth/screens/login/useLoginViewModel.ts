import { LoginUseCase } from '@application/auth/LoginUseCase';
import { RegisterExpoTokenUseCase } from '@application/notification/RegistExpoTokenUseCase';
import { container } from '@shared/di/container';
import { useAuthStore } from '@shared/stores/useAuthStore';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export function useLoginViewModel() {
  const loginUseCase = container.resolve(LoginUseCase);
  const registerExpoPushtokenUseCase = container.resolve(RegisterExpoTokenUseCase);
  const router = useRouter();
  
  const { setUser, setLoading, setError, isLoading } = useAuthStore();
  
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      const auth = await loginUseCase.execute(userId, password, autoLogin);
      setUser(auth.user);
      const token = await registerExpoPushtokenUseCase.execute(auth.user.id);
      alert('로그인에 성공하였습니다.');
      router.replace('/home');
    } catch (error: any) {
      setError(error.message || '로그인에 실패하였습니다.');
      alert(error.message || '로그인에 실패하였습니다.');
    }
  };

  const navigateToResetPassword = () => {
    router.push('/auth/account-search');
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

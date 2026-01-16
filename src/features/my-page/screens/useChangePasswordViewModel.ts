import { UpdateProfileUseCase } from '@application/user/UpdateProfileUseCase';
import { container } from '@shared/di/container';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

export function useChangePasswordViewModel() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isPasswordValid = newPassword.length >= 8;
  const isConfirmMatch = newPassword === confirmPassword && confirmPassword.length > 0;

  const handleChangePassword = async () => {
    if (!isPasswordValid) {
      Alert.alert('오류', '비밀번호는 8자 이상이어야 합니다.');
      return;
    }
    if (!isConfirmMatch) {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);
    try {
      const updateProfileUseCase = container.resolve(UpdateProfileUseCase);
      await updateProfileUseCase.execute({ password: newPassword });
      Alert.alert('성공', '비밀번호가 변경되었습니다.', [
        { text: '확인', onPress: () => router.back() }
      ]);
    } catch (error: any) {
      Alert.alert('오류', error.message || '비밀번호 변경에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    isPasswordValid,
    isConfirmMatch,
    handleChangePassword,
    goBack: router.back,
  };
}

import { CheckIdDuplicateUseCase } from '@application/auth/CheckIdDuplicateUseCase';
import { RegisterUseCase } from '@application/auth/RegisterUseCase';
import { GetUserGroupOptionsUseCase } from '@application/user/GetUserGroupOptionsUseCase';
import { UserGroupOption } from '@domain/user/IUserRepository';
import { container } from '@shared/di/container';
import { useFunnel } from '@shared/hooks/useFunnel';
import { useCallback, useState } from 'react';
import { RegisterData, useRegisterStore } from '../../stores/useRegisterStore';

export const REGISTER_STEPS = [
  'Terms',
  'Email',
  'Name',
  'Gender',
  'Phone',
  'Affiliation',
  'Id',
  'Password',
  'Confirmation',
  'Welcome',
] as const;

export type RegisterStep = typeof REGISTER_STEPS[number];

export { RegisterData };

export function useRegisterViewModel() {
  const funnel = useFunnel<RegisterStep>({
    steps: [...REGISTER_STEPS],
    initialStep: 'Terms',
  });

  const registerUseCase = container.resolve(RegisterUseCase);
  
  const checkIdDuplicate = async (id: string): Promise<boolean> => {
    try {
      const checkIdDuplicateUseCase = container.resolve(CheckIdDuplicateUseCase);
      return await checkIdDuplicateUseCase.execute(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const { data: registerData, updateData, reset } = useRegisterStore();
  const [groupOptions, setGroupOptions] = useState<UserGroupOption[]>([]);
  const [groupOptionsLoading, setGroupOptionsLoading] = useState(false);

  const loadGroupOptions = useCallback(async () => {
    if (groupOptionsLoading) return;
    setGroupOptionsLoading(true);
    try {
      const getUserGroupOptionsUseCase = container.resolve(
        GetUserGroupOptionsUseCase,
      );
      const options = await getUserGroupOptionsUseCase.execute();
      setGroupOptions(options);
    } catch (error) {
      console.error('Failed to load user group options:', error);
    } finally {
      setGroupOptionsLoading(false);
    }
  }, [groupOptionsLoading]);

  const register = async () => {
    try {
      const group = registerData.affiliation;

      const apiData = {
        userId: registerData.userId,
        password: registerData.password,
        name: registerData.name,
        group: group,
        phone: registerData.phoneNumber,
        birth: registerData.birthdate,
        gender: registerData.gender === 'M' ? 'male' : 'female',
        rank: 'M',
        email: registerData.email,
        verificationToken: registerData.verificationToken,
      };

      await registerUseCase.execute(apiData);
      funnel.next();
      // reset()은 RegisterScreen 언마운트 시 호출됨
    } catch (error: any) {
      console.error(error);
      const errorMsg = error.message || '';
      
      // 인증 토큰 만료 관련 오류만 재인증 유도 (일반 토큰 오류는 제외)
      if (errorMsg.includes('존재하지 않는 사용자') || 
          errorMsg.includes('verificationToken') ||
          errorMsg.includes('인증이 만료')) {
        updateData({ verificationToken: '', email: '' });
        funnel.goTo('Email');
        alert('이메일 인증이 만료되었습니다. 다시 인증해주세요.');
      } else {
        alert(errorMsg || '회원가입에 실패했습니다.');
      }
    }
  };

  return {
    ...funnel,
    stepIndex: funnel.stepIndex,
    registerData,
    groupOptions,
    groupOptionsLoading,
    loadGroupOptions,
    updateData,
    register,
    reset,
    checkIdDuplicate,
  };
}

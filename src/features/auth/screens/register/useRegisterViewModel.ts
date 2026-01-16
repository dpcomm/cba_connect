import { CheckIdDuplicateUseCase } from '@application/auth/CheckIdDuplicateUseCase';
import { RegisterUseCase } from '@application/auth/RegisterUseCase';
import { container } from '@shared/di/container';
import { useFunnel } from '@shared/hooks/useFunnel';
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
      alert(error.message || '회원가입에 실패했습니다.');
    }
  };

  return {
    ...funnel,
    stepIndex: funnel.stepIndex,
    registerData,
    updateData,
    register,
    reset,
    checkIdDuplicate,
  };
}

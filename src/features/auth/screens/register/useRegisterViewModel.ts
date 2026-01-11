import { RegisterUseCase } from '@application/auth/RegisterUseCase';
import { container } from '@shared/di/container';
import { useFunnel } from '@shared/hooks/useFunnel';
import { useState } from 'react';

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

export interface RegisterData {
  agreedToTerms: boolean;
  name: string;
  gender: 'M' | 'F' | null;
  birthdate: string;
  phoneNumber: string;
  affiliation: string;
  userId: string;
  password: string;
  email: string;
  verificationToken: string;
}

export function useRegisterViewModel() {
  const funnel = useFunnel<RegisterStep>({
    steps: [...REGISTER_STEPS],
    initialStep: 'Terms',
  });

  const registerUseCase = container.resolve(RegisterUseCase);

  const [registerData, setRegisterData] = useState<RegisterData>({
    agreedToTerms: false,
    name: '',
    gender: null,
    birthdate: '1990-01-01',
    phoneNumber: '',
    affiliation: '',
    userId: '',
    password: '',
    email: '',
    verificationToken: '',
  });

  const updateData = (data: Partial<RegisterData>) => {
    setRegisterData((prev) => ({ ...prev, ...data }));
  };

  const register = async () => {
    try {
      let group = registerData.affiliation;
      let rank = 'ST';
      if (group.endsWith(' M')) {
        rank = 'M';
        group = group.slice(0, -2);
      }

      const apiData = {
        userId: registerData.userId,
        password: registerData.password,
        name: registerData.name,
        group: group,
        phone: registerData.phoneNumber,
        birth: registerData.birthdate,
        gender: registerData.gender === 'M' ? 'male' : 'female',
        rank: rank,
        email: registerData.email,
        verificationToken: registerData.verificationToken,
      };

      await registerUseCase.execute(apiData);
      funnel.next();
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
  };
}

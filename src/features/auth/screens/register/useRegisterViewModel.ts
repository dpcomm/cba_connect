import { useFunnel } from '@shared/hooks/useFunnel';
import { useState } from 'react';

export const REGISTER_STEPS = [
  'Terms',
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
  // Terms
  agreedToTerms: boolean;
  
  // Profile
  name: string;
  gender: 'M' | 'F' | null;
  birthdate: string;
  
  // Phone
  phoneNumber: string;
  
  // Affiliation
  affiliation: string;
  
  // Account
  userId: string;
  password: string;
}

export function useRegisterViewModel() {
  const funnel = useFunnel<RegisterStep>({
    steps: [...REGISTER_STEPS],
    initialStep: 'Terms',
  });

  const [registerData, setRegisterData] = useState<RegisterData>({
    agreedToTerms: false,
    name: '',
    gender: null,
    birthdate: '1990-01-01',
    phoneNumber: '',
    affiliation: '',
    userId: '',
    password: '',
  });

  const updateData = (data: Partial<RegisterData>) => {
    setRegisterData((prev) => ({ ...prev, ...data }));
  };

  return {
    ...funnel,
    stepIndex: funnel.stepIndex,
    registerData,
    updateData,
  };
}

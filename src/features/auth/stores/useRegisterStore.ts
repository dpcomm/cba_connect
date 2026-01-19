import { create } from 'zustand';

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

interface RegisterState {
  data: RegisterData;
  updateData: (data: Partial<RegisterData>) => void;
  reset: () => void;
}

const INITIAL_DATA: RegisterData = {
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
};

export const useRegisterStore = create<RegisterState>((set) => ({
  data: INITIAL_DATA,
  updateData: (updates) => set((state) => ({ data: { ...state.data, ...updates } })),
  reset: () => set({ data: INITIAL_DATA }),
}));

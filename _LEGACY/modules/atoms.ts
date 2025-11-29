import { DefaultApplication, DefaultIsLoading, DefaultNavInfo, DefaultUser } from './defaults';
import { NavInfo } from '@type/index';
import { Application, IsLoading, User } from '@type/states';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const naviState = atom<NavInfo>({
  key: 'naviState',
  default: DefaultNavInfo,
  effects_UNSTABLE: [persistAtom],
});

export const userState = atom<User>({
  key: 'userState',
  default: DefaultUser,
  effects_UNSTABLE: [persistAtom],
});

export const applicationState = atom<Application>({
  key: 'applicationState',
  default: DefaultApplication,
  effects_UNSTABLE: [persistAtom],
});

export const isLoadingState = atom<IsLoading>({
  key: 'isLoading',
  default: DefaultIsLoading,
  effects_UNSTABLE: [persistAtom],
});
import 'reflect-metadata';

import { AutoLoginUseCase } from '@application/auth/AutoLoginUseCase';
import { container } from '@shared/di/container';
import { useAuthStore } from '@shared/stores/useAuthStore';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

// 스플래시 화면이 자동으로 숨겨지지 않도록 설정
SplashScreen.preventAutoHideAsync();

// 모듈 레벨에서 자동 로그인 체크 여부 관리 (컴포넌트 리마운트에도 유지)
let hasAutoLoginBeenChecked = false;

export default function RootLayout() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [isReady, setIsReady] = useState(hasAutoLoginBeenChecked);

  const [fontsLoaded] = useFonts({
    'Pretendard-Black': require('../assets/fonts/Pretendard-Black.otf'),
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-ExtraBold': require('../assets/fonts/Pretendard-ExtraBold.otf'),
    'Pretendard-ExtraLight': require('../assets/fonts/Pretendard-ExtraLight.otf'),
    'Pretendard-Light': require('../assets/fonts/Pretendard-Light.otf'),
    'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
    'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
    'Pretendard-SemiBold': require('../assets/fonts/Pretendard-SemiBold.otf'),
    'Pretendard-Thin': require('../assets/fonts/Pretendard-Thin.otf'),
  });

  // 자동 로그인 체크
  useEffect(() => {
    // 이미 체크했으면 다시 실행하지 않음
    if (hasAutoLoginBeenChecked) {
      setIsReady(true);
      return;
    }

    const checkAutoLogin = async () => {
      try {
        const autoLoginUseCase = container.resolve(AutoLoginUseCase);
        const user = await autoLoginUseCase.execute();

        if (user) {
          setUser(user);
          router.replace('/home');
        }
      } catch (error) {
        console.warn('Auto login failed:', error);
      } finally {
        hasAutoLoginBeenChecked = true;
        setIsReady(true);
      }
    };

    if (fontsLoaded) {
      checkAutoLogin();
    }

    // 현재 Expo Go 환경에서 Expo Notification을 테스트하지 못하는 상황입니다.
    // 원인으로는 다음과 같습니다.
    // 1. project id의 부재
    // 2. 현재 Expo SDK 버전의 Expo Go에서는 Android 푸시가 제거됨
    // 그런 이유로, Expo Go 상에서 다른 기능을 테스트하고 싶으시면 하단의 initializeNotificaitons()함수를 주석처리해주시고 동작하시면 됩니다.
    // initializeNotifications();
  }, [fontsLoaded]);

  useEffect(() => {
    if (fontsLoaded && isReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isReady]);

  if (!fontsLoaded || !isReady) {
    return null;
  }

  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>
  );
}

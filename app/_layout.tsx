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
      <Stack.Screen name="index" options={{ title: 'Login' }} />
    </Stack>
  );
}

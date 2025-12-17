import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'reflect-metadata';

// 스플래시 화면이 자동으로 숨겨지지 않도록 설정
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // 스플래시 화면이 보이는 동안 아무것도 렌더링하지 않음
  }

  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ title: 'Login' }} />
    </Stack>
  );
}

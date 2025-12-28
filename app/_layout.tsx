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

    // 현재 Expo Go 환경에서 Expo Notification을 테스트하지 못하는 상황입니다.
    // 원인으로는 다음과 같습니다.
    // 1. project id의 부재
    // 2. 현재 Expo SDK 버전의 Expo Go에서는 Android 푸시가 제거됨
    // 그런 이유로, Expo Go 상에서 다른 기능을 테스트하고 싶으시면 하단의 initializeNotificaitons()함수를 주석처리해주시고 동작하시면 됩니다.
    // initializeNotifications();
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

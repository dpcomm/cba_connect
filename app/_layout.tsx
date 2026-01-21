import "reflect-metadata";

import { AutoLoginUseCase } from "@application/auth/AutoLoginUseCase";
import { CheckConsentUseCase } from "@application/consent/CheckConsentUseCase";
import { SubmitConsentUseCase } from "@application/consent/SubmitConsentUseCase";
import { CheckVersionUseCase } from "@application/status/CheckVersionUseCase";
import { PermissionModal } from "@shared/components/modal/PermissionModal";
import { container } from "@shared/di/container";
import { useAuthStore } from "@shared/stores/useAuthStore";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

// 스플래시 화면이 자동으로 숨겨지지 않도록 설정
SplashScreen.preventAutoHideAsync();

// 모듈 레벨에서 앱 시작 체크 여부 관리 (컴포넌트 리마운트에도 유지)
let hasAppStartChecked = false;

export default function RootLayout() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [isReady, setIsReady] = useState(hasAppStartChecked);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const [fontsLoaded] = useFonts({
    "Pretendard-Black": require("../assets/fonts/Pretendard-Black.otf"),
    "Pretendard-Bold": require("../assets/fonts/Pretendard-Bold.otf"),
    "Pretendard-ExtraBold": require("../assets/fonts/Pretendard-ExtraBold.otf"),
    "Pretendard-ExtraLight": require("../assets/fonts/Pretendard-ExtraLight.otf"),
    "Pretendard-Light": require("../assets/fonts/Pretendard-Light.otf"),
    "Pretendard-Medium": require("../assets/fonts/Pretendard-Medium.otf"),
    "Pretendard-Regular": require("../assets/fonts/Pretendard-Regular.otf"),
    "Pretendard-SemiBold": require("../assets/fonts/Pretendard-SemiBold.otf"),
    "Pretendard-Thin": require("../assets/fonts/Pretendard-Thin.otf"),
  });

  useEffect(() => {
    if (hasAppStartChecked) {
      setIsReady(true);
      return;
    }

    const startAppFlow = async () => {
      try {
        // 버전 체크
        const checkVersionUseCase = container.resolve(CheckVersionUseCase);
        const versionResult = await checkVersionUseCase.execute();

        if (versionResult.isUpdateNeeded) {
          // 업데이트 필요 여부 체크
          hasAppStartChecked = true;
          setIsReady(true);
          router.replace({
            pathname: "/update",
            params: {
              currentVersion: versionResult.currentVersion,
              latestVersion: versionResult.latestVersion,
            },
          });
          return;
        }
        // 자동 로그인 체크
        const autoLoginUseCase = container.resolve(AutoLoginUseCase);
        const user = await autoLoginUseCase.execute();

        if (user) {
          setUser(user);

          // 약관 동의 체크 (API)
          const checkConsentUseCase = container.resolve(CheckConsentUseCase);
          const isConsented = await checkConsentUseCase.execute();

          if (!isConsented) {
            // 동의 필요 -> 모달 표시
            setShowPermissionModal(true);
            return; // 모달 확인 후 handlePermissionConfirm에서 처리
          }

          // 동의 완료됨 -> 홈으로 이동
          router.replace("/home");
        }
      } catch (error) {
        console.warn("App flow error:", error);
      } finally {
        hasAppStartChecked = true;
        setIsReady(true);
      }
    };

    if (fontsLoaded) {
      startAppFlow();
    }
  }, [fontsLoaded, router, setUser]);

  const handlePermissionConfirm = async () => {
    try {
      // API로 동의 제출
      const submitConsentUseCase = container.resolve(SubmitConsentUseCase);
      await submitConsentUseCase.execute();

      setShowPermissionModal(false);
      router.replace("/home");
    } catch (error) {
      console.warn("Consent submission failed:", error);
      // 에러 발생해도 일단 진행 (사용자 경험 우선)
      setShowPermissionModal(false);
      router.replace("/home");
    }
  };

  useEffect(() => {
    if (fontsLoaded && isReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isReady]);

  if (!fontsLoaded || !isReady) {
    return null;
  }

  return (
    <>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="update" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="carpool" options={{ headerShown: false }} />
        <Stack.Screen name="notice" options={{ headerShown: false }} />
        <Stack.Screen
          name="my-page"
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
      </Stack>
      {showPermissionModal && (
        <PermissionModal
          visible={showPermissionModal}
          onConfirm={handlePermissionConfirm}
        />
      )}
      <StatusBar style="dark" />
    </>
  );
}

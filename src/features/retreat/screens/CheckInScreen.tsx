import { GetMyRetreatApplicationUseCase } from "@application/retreat/GetMyRetreatApplicationUseCase";
import { GetSystemConfigUseCase } from "@application/system/GetSystemConfigUseCase";
import { RetreatApplication } from "@domain/retreat/RetreatApplication";
import { Ionicons } from "@expo/vector-icons";
import { container } from "@shared/di/container";
import { useAuthStore } from "@shared/stores/useAuthStore";
import * as Brightness from "expo-brightness";
import { useFocusEffect, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { QR_SIZE, styles } from "./CheckInScreen.styles";

const POLLING_INTERVAL = 3000;

export default function CheckInScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [application, setApplication] = useState<RetreatApplication | null>(
    null,
  );
  const originalBrightnessRef = useRef<number | null>(null);
  const glowAnim = useRef(new Animated.Value(0)).current;
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const systemConfigRef = useRef<{ currentRetreatId: number } | null>(null);

  // 화면 Pop 시 밝기 복구
  const restoreBrightness = useCallback(async () => {
    if (originalBrightnessRef.current !== null) {
      try {
        await Brightness.setBrightnessAsync(originalBrightnessRef.current);
      } catch {
        // ignore
      }
    }
  }, []);

  // 화면 진입 시 밝기 최대화
  useFocusEffect(
    useCallback(() => {
      const setBrightness = async () => {
        try {
          const current = await Brightness.getBrightnessAsync();
          originalBrightnessRef.current = current;
          await Brightness.setBrightnessAsync(1);
        } catch (error) {
          console.warn("Failed to set brightness:", error);
        }
      };

      setBrightness();

      return () => {
        restoreBrightness();
      };
    }, [restoreBrightness]),
  );

  const fetchApplication = useCallback(async () => {
    try {
      if (!systemConfigRef.current) {
        const getSystemConfigUseCase = container.resolve(
          GetSystemConfigUseCase,
        );
        systemConfigRef.current = await getSystemConfigUseCase.execute();
      }

      const getMyRetreatApplicationUseCase = container.resolve(
        GetMyRetreatApplicationUseCase,
      );
      const app = await getMyRetreatApplicationUseCase.execute(
        systemConfigRef.current.currentRetreatId,
      );

      setApplication(app);

      // 체크인 완료 시 이벤트 화면으로 이동
      if (app?.checkedInAt) {
        await restoreBrightness();
        router.replace("/retreat/success" as any);
      }
    } catch (error) {
      console.error("Failed to load application:", error);
    }
  }, [restoreBrightness, router]);

  // QR 체크인 폴링
  useEffect(() => {
    fetchApplication();

    pollingRef.current = setInterval(fetchApplication, POLLING_INTERVAL);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [fetchApplication]);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [glowAnim]);

  const handleClose = async () => {
    await restoreBrightness();
    router.back();
  };

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  const qrValue =
    application && systemConfigRef.current
      ? `retreat-checked-in:${systemConfigRef.current.currentRetreatId}:${user?.userId || "unknown"}`
      : "loading";

  return (
    <View style={styles.container}>
      <StatusBar style="light" hidden />

      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Ionicons name="close" size={32} color="white" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Image
          source={require("../../../../assets/images/qr_header_logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.qrContainer}>
        <Animated.View
          style={[
            styles.glowEffect,
            {
              opacity: glowOpacity,
              shadowOpacity: glowOpacity,
            },
          ]}
        />
        <View style={styles.qrWrapper}>
          <QRCode
            value={qrValue}
            size={QR_SIZE}
            backgroundColor="white"
            color="black"
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.userName}>{user?.name || "참가자"}</Text>
        <Text style={styles.instruction}>
          총무팀에게 이 QR 코드를 보여주세요
        </Text>
      </View>
    </View>
  );
}

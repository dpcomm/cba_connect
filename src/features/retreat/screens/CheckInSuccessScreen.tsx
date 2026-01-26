import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@shared/stores/useAuthStore";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { styles } from "./CheckInSuccessScreen.styles";

export default function CheckInSuccessScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [countdown, setCountdown] = React.useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const animation = Animated.sequence([
      Animated.delay(2000),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    animation.start(() => {
      router.replace("/retreat/raffle" as any);
    });

    return () => {
      animation.stop();
      clearInterval(interval);
    };
  }, [router, fadeAnim]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" hidden />

      <View style={styles.iconContainer}>
        <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
      </View>

      <Text style={styles.title}>체크인 완료!</Text>
      <Text style={styles.subtitle}>
        {user?.name || "참가자"}님,{"\n"}
        2026 CBA 겨울수련회{"\n"}
        &apos;바라봄&apos;에 오신 것을 환영합니다.
      </Text>

      <Text style={styles.countdown}>
        {countdown}초 뒤 이벤트 추첨 화면으로 이동합니다.
      </Text>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: "white",
            opacity: fadeAnim,
            zIndex: 100,
          },
        ]}
      />
    </View>
  );
}

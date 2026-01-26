import { PlayEventUseCase } from "@application/retreat/PlayEventUseCase";
import { GetSystemConfigUseCase } from "@application/system/GetSystemConfigUseCase";
import { container } from "@shared/di/container";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EventRaffleScreen() {
  const router = useRouter();
  const hasNavigated = useRef(false);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const playEvent = async () => {
      if (hasNavigated.current) return;
      hasNavigated.current = true;

      const startTime = Date.now();
      let shouldNavigate = true;

      try {
        const getSystemConfigUseCase = container.resolve(
          GetSystemConfigUseCase,
        );
        const config = await getSystemConfigUseCase.execute();

        const playEventUseCase = container.resolve(PlayEventUseCase);
        await playEventUseCase.execute(config.currentRetreatId);
      } catch (err: any) {
        console.error("Event participation failed:", err);
        if (err.message !== "ALREADY_PARTICIPATED") {
          shouldNavigate = false;
          setError(err.message || "이벤트 참여 중 오류가 발생했습니다.");
        }
      } finally {
        if (shouldNavigate) {
          const elapsed = Date.now() - startTime;
          const remainingTime = Math.max(3000 - elapsed, 0);

          setTimeout(() => {
            router.replace("/retreat/result" as any);
          }, remainingTime);
        }
      }
    };

    playEvent();
  }, [router]);

  const handleGoHome = () => {
    router.replace("/home");
  };

  if (error) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" hidden />
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>오류 발생</Text>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleGoHome}>
          <Text style={styles.buttonText}>홈으로 돌아가기</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" hidden />
      <Image
        source={require("../../../../assets/images/event_loading.gif")}
        style={styles.gif}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  gif: {
    width: "80%",
    height: "50%",
  },
  errorContainer: {
    alignItems: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontFamily: "Pretendard-Bold",
    marginBottom: 10,
    color: "#d32f2f",
  },
  errorMessage: {
    fontSize: 16,
    fontFamily: "Pretendard-Regular",
    textAlign: "center",
    color: "#333",
  },
  button: {
    backgroundColor: "#0a0a0a",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontFamily: "Pretendard-SemiBold",
  },
});

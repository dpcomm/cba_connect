import { GetMyRetreatApplicationUseCase } from "@application/retreat/GetMyRetreatApplicationUseCase";
import { GetSystemConfigUseCase } from "@application/system/GetSystemConfigUseCase";
import { container } from "@shared/di/container";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WinSvg from "../../../../assets/svgs/event-win.svg";

export default function EventResultScreen() {
  const router = useRouter();
  const [result, setResult] = useState<"WIN" | "LOSE" | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const getSystemConfigUseCase = container.resolve(
          GetSystemConfigUseCase,
        );
        const config = await getSystemConfigUseCase.execute();

        const getMyRetreatApplicationUseCase = container.resolve(
          GetMyRetreatApplicationUseCase,
        );
        const app = await getMyRetreatApplicationUseCase.execute(
          config.currentRetreatId,
        );

        setResult(app?.eventResult || "LOSE");
      } catch (error) {
        console.error("Failed to fetch result:", error);
        setResult("LOSE");
      }
    };

    fetchResult();
  }, []);

  const handleGoHome = () => {
    router.back();
  };

  if (!result) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" hidden />

      <View style={styles.content}>
        {result === "WIN" ? (
          <>
            <WinSvg width={300} height={300} />
            <Text style={styles.resultTitle}>당첨!</Text>
            <Text style={styles.resultMessage}>
              이벤트에 당첨되셨습니다.{"\n"}
              총무팀에게 선물을 받아가세요!
            </Text>
          </>
        ) : (
          <>
            <Text style={{ fontSize: 100 }}>🙏🏻</Text>
            <Text style={styles.resultTitle}>아쉽!</Text>
            <Text style={styles.resultMessage}>
              다음 수련회를 노려보세요!{"\n"}
              참여해주셔서 감사합니다.
            </Text>
          </>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleGoHome}>
        <Text style={styles.buttonText}>홈으로 돌아가기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0a0a0a",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
    marginBottom: 40,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontFamily: "Pretendard-SemiBold",
  },
  resultTitle: {
    fontSize: 28,
    color: "#0a0a0a",
    fontFamily: "Pretendard-Bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  resultMessage: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Pretendard-Regular",
    textAlign: "center",
    lineHeight: 24,
  },
});

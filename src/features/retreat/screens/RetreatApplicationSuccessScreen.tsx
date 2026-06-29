import { GetSystemConfigUseCase } from "@application/system/GetSystemConfigUseCase";
import { GetApplicationOptionsUseCase } from "@application/retreat/GetApplicationOptionsUseCase";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "@shared/components/header/Header";
import { ThemedText } from "@shared/components/themed-text/ThemedText";
import { Color } from "@shared/constants/color";
import { container } from "@shared/di/container";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./RetreatApplicationSuccessScreen.styles";

export default function RetreatApplicationSuccessScreen() {
  const router = useRouter();
  const [retreatTitle, setRetreatTitle] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const getSystemConfig = container.resolve(GetSystemConfigUseCase);
        const getOptions = container.resolve(GetApplicationOptionsUseCase);
        const config = await getSystemConfig.execute();
        const options = await getOptions.execute(config.currentRetreatId);
        setRetreatTitle(options.retreat.title);
      } catch (e) {
        console.error("Failed to load retreat title:", e);
      }
    })();
  }, []);

  const headerTitle = retreatTitle
    ? `${retreatTitle} 수련회 신청`
    : "수련회 신청";

  const handleConfirm = () => {
    router.replace("/home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={headerTitle} onBack={handleConfirm} />

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark" size={48} color={Color.primary.main} />
        </View>
        <ThemedText style={styles.title}>
          수련회 신청이{"\n"}완료되었습니다 :)
        </ThemedText>
      </View>

      <SafeAreaView edges={["bottom"]} style={styles.bottomBar}>
        <Pressable
          onPress={handleConfirm}
          style={styles.confirmBtn}
          hitSlop={10}
        >
          <ThemedText style={styles.confirmText}>확인</ThemedText>
        </Pressable>
      </SafeAreaView>
    </SafeAreaView>
  );
}

import { Button } from "@shared/components/button/Button";
import { ThemedText } from "@shared/components/themed-text/ThemedText";
import { Color } from "@shared/constants/color";
import { Layout } from "@shared/constants/layout";
import * as Linking from "expo-linking";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import RecbaLogo from "../../../assets/svgs/recba_logo.svg";

interface UpdateRequiredScreenProps {
  currentVersion: string;
  latestVersion: string;
}

export function UpdateRequiredScreen({
  currentVersion,
  latestVersion,
}: UpdateRequiredScreenProps) {
  const handleUpdate = async () => {
    const storeUrl = Platform.select({
      ios: "https://apps.apple.com/kr/app/cba-connect/id6747623245",
      android:
        "https://play.google.com/store/apps/details?id=com.cba.cba_connect_application",
      default: "https://recba.me",
    });

    try {
      await Linking.openURL(storeUrl);
    } catch (error) {
      console.warn("Failed to open store:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <RecbaLogo width={180} height={42} />

        <ThemedText variant="text1" style={styles.message}>
          최적의 사용 환경을 위해{"\n"}최신 버전의 앱으로 업데이트 해주세요.
        </ThemedText>

        <View style={styles.versionContainer}>
          <View style={styles.versionRow}>
            <ThemedText variant="text2" color={Color.text.sub}>
              현재 버전:
            </ThemedText>
            <ThemedText variant="text2" style={styles.versionValue}>
              {currentVersion}
            </ThemedText>
          </View>
          <View style={styles.versionRow}>
            <ThemedText variant="text2" color={Color.text.sub}>
              최신 버전:
            </ThemedText>
            <ThemedText variant="text2" style={styles.versionValue}>
              {latestVersion}
            </ThemedText>
          </View>
        </View>

        <Button title="업데이트" onPress={handleUpdate} size="large" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.secondary.main,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Layout.spacing.xl,
  },
  content: {
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
  },
  message: {
    textAlign: "center",
    marginTop: Layout.spacing.xl,
    marginBottom: Layout.spacing.l,
    lineHeight: 24,
  },
  versionContainer: {
    marginBottom: Layout.spacing.xl,
    gap: Layout.spacing.s,
  },
  versionRow: {
    flexDirection: "row",
    gap: Layout.spacing.s,
  },
  versionValue: {
    fontWeight: "bold",
  },
});

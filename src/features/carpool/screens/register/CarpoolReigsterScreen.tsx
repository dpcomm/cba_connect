import { Header } from "@shared/components/header/Header";
import { ThemedText } from "@shared/components/themed-text/ThemedText";
import { Color } from "@shared/constants/color";
import { Layout } from "@shared/constants/layout";
import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { useCarpoolRegisterViewModel } from "./useCarpoolRegisterViewModel";

export default function CarpoolRegisterScreen() {
  const { selected, selectDestination } = useCarpoolRegisterViewModel();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Color.default.background }}
    >
      <Header title="카풀 등록" onBack={() => router.back()} />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: Layout.spacing.l,
          paddingBottom: 40,
          paddingTop: Layout.spacing.l,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Content */}
        <View style={{ gap: 28 }}>
          <ThemedText variant="heading3" style={styles.title}>
            목적지 선택
          </ThemedText>

          {/* 수련회장 */}
          <Pressable
            style={[styles.card, selected === "RETREAT" && styles.cardActive]}
            onPress={() => selectDestination("RETREAT")}
          >
            <ThemedText variant="heading1" style={styles.icon}>
              ⛪
            </ThemedText>
            <ThemedText
              variant="text1"
              style={[
                styles.cardText,
                selected === "RETREAT" && styles.cardTextActive,
              ]}
            >
              수련회장으로
            </ThemedText>
          </Pressable>

          {/* 집으로 */}
          <Pressable
            style={[styles.card, selected === "HOME" && styles.cardActive]}
            onPress={() => selectDestination("HOME")}
          >
            <ThemedText variant="heading1" style={styles.icon}>
              🏠
            </ThemedText>
            <ThemedText
              variant="text1"
              style={[
                styles.cardText,
                selected === "HOME" && styles.cardTextActive,
              ]}
            >
              집으로
            </ThemedText>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

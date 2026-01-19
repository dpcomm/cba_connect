import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@shared/components/themed-text/ThemedText";
import { Color } from "@shared/constants/color";
import { Layout } from "@shared/constants/layout";
import { useAuthStore } from "@shared/stores/useAuthStore";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export function ProfileCard() {
  const { user } = useAuthStore();
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.push("/my-page/my-info")}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Color.secondary.main,
        borderRadius: 8,
        padding: 16,
        marginBottom: 28,
        ...Layout.shadow.default,
      }}
    >
      <View
        style={{
          width: 62,
          height: 62,
          borderRadius: 36,
          backgroundColor: "#B0B0B0",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 16,
        }}
      >
        <Ionicons name="person" size={32} color="white" />
      </View>
      <View>
        <ThemedText variant="heading3" color={Color.text.main}>
          {user?.name || "사용자"} 님
        </ThemedText>
        <ThemedText
          variant="text2"
          color={Color.text.sub}
          style={{ marginTop: 2 }}
        >
          내 정보 보기
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
}

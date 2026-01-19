import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@shared/components/themed-text/ThemedText";
import { Color } from "@shared/constants/color";
import React from "react";
import { TouchableOpacity, View } from "react-native";

interface HomeHeaderProps {
  dDay?: number;
  onMenuPress?: () => void;
}

export function HomeHeader({ dDay = 0, onMenuPress }: HomeHeaderProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: Color.default.background,
      }}
    >
      <View style={{ flex: 1 }}>
        <ThemedText variant="heading1" color={Color.primary.main}>
          D-{dDay.toString().padStart(2, "0")}
        </ThemedText>
        <ThemedText variant="text2" color={Color.text.main}>
          주는 나의 목자시니
        </ThemedText>
        <ThemedText variant="text2" color={Color.text.main}>
          내가 부족함이 없으리로다.{" "}
          <ThemedText variant="text5" color={Color.text.main}>
            (시 23:1)
          </ThemedText>
        </ThemedText>
      </View>
      <TouchableOpacity
        onPress={onMenuPress}
        style={{
          width: 60,
          height: 60,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 96,
        }}
      >
        <Ionicons name="menu" size={30} color={Color.text.main} />
      </TouchableOpacity>
    </View>
  );
}

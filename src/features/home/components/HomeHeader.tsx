import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@shared/components/themed-text/ThemedText";
import { Color } from "@shared/constants/color";
import React from "react";
import {
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

interface HomeHeaderProps {
  dDay?: number | string;
  onMenuPress?: () => void;
}

function getVerseFontSize(width: number) {
  if (width <= 360) return 11;
  if (width <= 390) return 12;
  return 13;
}

function getMenuSize(width: number) {
  if (width <= 360) return 48;
  return 52;
}

export function HomeHeader({ dDay = 0, onMenuPress }: HomeHeaderProps) {
  const { width } = useWindowDimensions();

  const dDayText =
    typeof dDay === "number"
      ? `D-${dDay.toString().padStart(2, "0")}`
      : `D-${dDay}`;

  const verseFontSize = getVerseFontSize(width);
  const verseLineHeight = verseFontSize + 6;
  const menuSize = getMenuSize(width);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        backgroundColor: Color.default.background,
      }}
    >
      <View style={{ flex: 1, paddingRight: 12 }}>
        <ThemedText variant="heading1" color={Color.primary.main}>
          {dDayText}
        </ThemedText>

        <ThemedText
          variant="text2"
          color={Color.text.main}
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            fontSize: verseFontSize,
            lineHeight: verseLineHeight,
          }}
        >
          모든 사람으로 더불어 화평함과 거룩함을 좇으라
        </ThemedText>

        <ThemedText
          variant="text2"
          color={Color.text.main}
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            fontSize: verseFontSize,
            lineHeight: verseLineHeight,
          }}
        >
          이것이 없이는 아무도 주를 보지 못하리라.{" "}
          <ThemedText
            variant="text5"
            color={Color.text.main}
            style={{
              fontSize: verseFontSize - 1,
              lineHeight: verseLineHeight,
            }}
          >
            (히 12:14)
          </ThemedText>
        </ThemedText>
      </View>

      <TouchableOpacity
        onPress={onMenuPress}
        style={{
          width: menuSize,
          height: menuSize,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 999,
        }}
      >
        <Ionicons
          name="menu"
          size={width <= 360 ? 26 : 28}
          color={Color.text.main}
        />
      </TouchableOpacity>
    </View>
  );
}
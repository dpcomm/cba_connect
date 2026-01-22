import { ThemedText } from "@shared/components/themed-text/ThemedText";
import { Color } from "@shared/constants/color";
import { Layout } from "@shared/constants/layout";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import BackIcon from "../../../../assets/svgs/back.svg";

interface HeaderProps {
  title?: string;
  onBack?: () => void;
  style?: ViewStyle;
  rightContent?: React.ReactNode;
}

export function Header({ title, onBack, style, rightContent }: HeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View
      style={[
        {
          height: 46,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: Layout.spacing.l,
          backgroundColor: Color.default.background,
        },
        style,
      ]}
    >
      <TouchableOpacity
        onPress={handleBack}
        style={{
          zIndex: 1,
        }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <BackIcon width={30} height={30} />
      </TouchableOpacity>

      {title && (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            alignItems: "center",
            zIndex: 0,
          }}
        >
          <ThemedText variant="heading2" style={{ fontSize: 22 }}>
            {title}
          </ThemedText>
        </View>
      )}

      {rightContent && (
        <View
          style={{
            position: "absolute",
            right: Layout.spacing.m,
            zIndex: 1,
          }}
        >
          {rightContent}
        </View>
      )}
    </View>
  );
}

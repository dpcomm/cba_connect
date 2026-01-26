import { TextInput } from "@shared/components/text-input/TextInput";
import { ThemedText } from "@shared/components/themed-text/ThemedText";
import { Color } from "@shared/constants/color";
import { Layout } from "@shared/constants/layout";
import React from "react";
import { View } from "react-native";

interface Props {
  userId: string;
  setUserId: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
}

export function FindPasswordTab({ userId, setUserId, email, setEmail }: Props) {
  return (
    <View
      style={{
        flex: 1,
        padding: Layout.spacing.l,
        backgroundColor: Color.default.background,
      }}
    >
      <TextInput
        placeholder="아이디 입력"
        value={userId}
        onChangeText={setUserId}
        containerStyle={{ marginBottom: Layout.spacing.m }}
      />
      <TextInput
        placeholder="이메일 입력"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <ThemedText
        variant="text4"
        color={Color.text.sub}
        style={{ marginTop: Layout.spacing.m }}
      >
        비밀번호 찾기 기능은 이메일 인증한 사용자만 가능합니다.
      </ThemedText>
    </View>
  );
}

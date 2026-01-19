import { Button } from "@shared/components/button/Button";
import { PermissionModal } from "@shared/components/modal/PermissionModal";
import { TextInput } from "@shared/components/text-input/TextInput";
import { ThemedText } from "@shared/components/themed-text/ThemedText";
import { Color } from "@shared/constants/color";
import { Layout } from "@shared/constants/layout";
import React from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import RecbaLogo from "../../../../../assets/svgs/recba_logo.svg";
import { styles } from "./styles";
import { useLoginViewModel } from "./useLoginViewModel";

export default function LoginScreen() {
  const {
    userId,
    setUserId,
    password,
    setPassword,
    isLoading,
    login,
    navigateToResetPassword,
    navigateToRegister,
    showPermissionModal,
    handlePermissionConfirm,
  } = useLoginViewModel();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <RecbaLogo width={210} height={49} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="아이디 입력"
          value={userId}
          onChangeText={setUserId}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="비밀번호 입력"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button
          title="로그인"
          onPress={login}
          disabled={isLoading}
          size="large"
          textVariant="text1"
        />
        {isLoading && (
          <ActivityIndicator
            style={{ marginTop: Layout.spacing.s }}
            color={Color.primary.main}
          />
        )}
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={navigateToRegister}>
          <ThemedText variant="text2" color={Color.text.main}>
            회원가입
          </ThemedText>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity onPress={navigateToResetPassword}>
          <ThemedText variant="text2" color={Color.text.main}>
            ID/PW 찾기
          </ThemedText>
        </TouchableOpacity>
      </View>

      {showPermissionModal && (
        <PermissionModal
          visible={showPermissionModal}
          onConfirm={handlePermissionConfirm}
        />
      )}
    </View>
  );
}

import { Button } from '@shared/components/button/Button';
import { Header } from '@shared/components/header/Header';
import { Color } from '@shared/constants/color';
import { Font } from '@shared/constants/font';
import { Layout } from '@shared/constants/layout';
import React from 'react';
import { TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useChangePasswordViewModel } from './useChangePasswordViewModel';

export default function ChangePasswordScreen() {
  const {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    isPasswordValid,
    isConfirmMatch,
    handleChangePassword,
    goBack,
  } = useChangePasswordViewModel();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.default.background }}>
      <Header title="비밀번호 변경" onBack={goBack} />
      <View style={{ flex: 1, padding: Layout.spacing.l, gap: Layout.spacing.l }}>
        <View>
          <TextInput
            placeholder="새 비밀번호 (8자 이상)"
            placeholderTextColor={Color.text.disabled}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            style={{
              ...Font.text1,
              color: Color.text.main,
              borderBottomWidth: 2,
              borderBottomColor: Color.primary.main,
              paddingVertical: Layout.spacing.m,
            }}
          />
        </View>
        <View>
          <TextInput
            placeholder="비밀번호 확인"
            placeholderTextColor={Color.text.disabled}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={{
              ...Font.text1,
              color: Color.text.main,
              borderBottomWidth: 2,
              borderBottomColor: isConfirmMatch ? Color.primary.main : (confirmPassword ? Color.accents.pink : Color.primary.main),
              paddingVertical: Layout.spacing.m,
            }}
          />
        </View>
        <View style={{ flex: 1 }} />
        <Button
          title="비밀번호 변경"
          onPress={handleChangePassword}
          size="large"
          disabled={!isPasswordValid || !isConfirmMatch || isLoading}
        />
      </View>
    </SafeAreaView>
  );
}

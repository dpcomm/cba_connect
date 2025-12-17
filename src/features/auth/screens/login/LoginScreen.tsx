import { Button } from '@shared/components/button/Button';
import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import React from 'react';
import { ActivityIndicator, Switch, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { useLoginViewModel } from './useLoginViewModel';

export default function LoginScreen() {
  const {
    userId,
    setUserId,
    password,
    setPassword,
    autoLogin,
    setAutoLogin,
    isLoading,
    login,
    navigateToResetPassword,
    navigateToRegister,
  } = useLoginViewModel();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <ThemedText variant="heading2" style={styles.logoLight}>Welcome to</ThemedText>
        <ThemedText variant="heading1" style={styles.logoBold}>CBA</ThemedText>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="아이디"
          placeholderTextColor={Color.text.disabled}
          value={userId}
          onChangeText={setUserId}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor={Color.text.disabled}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <Button 
          title="로그인"
          onPress={login}
          disabled={isLoading}
          size="large"
          variant="primary"
        />
        {isLoading && <ActivityIndicator style={{ marginTop: Layout.spacing.s }} color={Color.primary.main} />}
      </View>

      <View style={styles.optionContainer}>
        <Switch
          value={autoLogin}
          onValueChange={setAutoLogin}
          trackColor={{ false: Color.text.disabled, true: Color.primary.hover }}
          thumbColor={Color.secondary.main}
        />
        <ThemedText variant="text2" color={Color.text.sub} style={styles.optionText}>
          로그인 유지
        </ThemedText>
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={navigateToResetPassword}>
          <ThemedText variant="text3" color={Color.text.sub}>비밀번호 재설정</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToRegister}>
          <ThemedText variant="text3" color={Color.text.sub}>회원가입</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

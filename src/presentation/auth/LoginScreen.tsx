import React from 'react';
import { ActivityIndicator, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
        <Text style={styles.logoLight}>Welcome to</Text>
        <Text style={styles.logoBold}>CBA</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="아이디"
          value={userId}
          onChangeText={setUserId}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={login}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.loginButtonText}>로그인</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.optionContainer}>
        <Switch
          value={autoLogin}
          onValueChange={setAutoLogin}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={autoLogin ? "#f5dd4b" : "#f4f3f4"}
        />
        <Text style={styles.optionText}>로그인 유지</Text>
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={navigateToResetPassword}>
          <Text style={styles.footerText}>비밀번호 재설정</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToRegister}>
          <Text style={styles.footerText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoLight: {
    fontSize: 24,
    fontWeight: '300',
    color: '#333',
  },
  logoBold: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    height: 52,
    backgroundColor: '#333',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
});

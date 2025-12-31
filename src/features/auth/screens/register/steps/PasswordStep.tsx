import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Font } from '@shared/constants/font';
import { Layout } from '@shared/constants/layout';
import React, { useRef, useState } from 'react';
import { TextInput as RNTextInput, TouchableOpacity, View } from 'react-native';

interface Props {
  password: string;
  setPassword?: (text: string) => void;
  onNext?: () => void;
  readOnly?: boolean;
}

export function PasswordStep({ password, setPassword, onNext, readOnly }: Props) {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const confirmInputRef = useRef<RNTextInput>(null);

  if (readOnly) {
    return (
      <View style={{ marginBottom: Layout.spacing.l }}>
        <ThemedText variant="text3" color={Color.text.sub}>비밀번호</ThemedText>
        <ThemedText variant="heading3" style={{ marginTop: Layout.spacing.xs }}>{'•'.repeat(password.length)}</ThemedText>
      </View>
    );
  }

  const handlePasswordSubmit = () => {
    confirmInputRef.current?.focus();
  };

  const handleConfirmSubmit = () => {
    if (password.length < 8) {
      return;
    }
    if (password !== confirmPassword) {
      return;
    }
    onNext?.();
  };

  const isPasswordValid = password.length >= 8;
  const isConfirmMatch = password === confirmPassword && confirmPassword.length > 0;

  return (
    <View style={{ width: '100%' }}>
      <ThemedText variant="text3" color={Color.text.sub} style={{ marginBottom: Layout.spacing.xs }}>비밀번호</ThemedText>
      <View style={{ 
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2, 
        borderBottomColor: Color.primary.main,
        paddingBottom: Layout.spacing.s,
        marginBottom: Layout.spacing.xs,
      }}>
        <RNTextInput
          placeholder="비밀번호 입력 (8자 이상)"
          placeholderTextColor={Color.text.disabled}
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={handlePasswordSubmit}
          returnKeyType="next"
          secureTextEntry={!showPassword}
          style={{
            ...Font.heading3,
            color: Color.text.main,
            padding: 0,
            flex: 1,
          }}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 4 }}>
          <Ionicons 
            name={showPassword ? 'eye' : 'eye-off'} 
            size={20} 
            color={Color.text.sub} 
          />
        </TouchableOpacity>
      </View>

      {/* Password Hints */}
      <View style={{ marginBottom: Layout.spacing.l }}>
        <ThemedText variant="text4" color={Color.text.sub} style={{ marginBottom: 2 }}>
          • 8자리 이상 입력(영문/숫자)
        </ThemedText>
        <ThemedText 
          variant="text4" 
          color={isPasswordValid ? '#007AFF' : '#FF3B30'}
        >
          • {isPasswordValid ? '사용가능한 비밀번호입니다.' : '사용 불가능한 비밀번호입니다.'}
        </ThemedText>
      </View>

      <ThemedText variant="text3" color={Color.text.sub} style={{ marginBottom: Layout.spacing.xs }}>비밀번호 확인</ThemedText>
      <View style={{ 
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2, 
        borderBottomColor: Color.primary.main,
        paddingBottom: Layout.spacing.s,
      }}>
        <RNTextInput
          ref={confirmInputRef}
          placeholder="비밀번호 확인"
          placeholderTextColor={Color.text.disabled}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          onSubmitEditing={handleConfirmSubmit}
          returnKeyType="done"
          secureTextEntry={!showConfirmPassword}
          style={{
            ...Font.heading3,
            color: Color.text.main,
            padding: 0,
            flex: 1,
          }}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={{ padding: 4 }}>
          <Ionicons 
            name={showConfirmPassword ? 'eye' : 'eye-off'} 
            size={20} 
            color={Color.text.sub} 
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Match Status */}
      {confirmPassword.length > 0 && (
        <ThemedText 
          variant="text4" 
          color={isConfirmMatch ? '#007AFF' : '#FF3B30'}
          style={{ marginTop: Layout.spacing.xs }}
        >
          • {isConfirmMatch ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
        </ThemedText>
      )}
    </View>
  );
}

import { Ionicons } from '@expo/vector-icons';
import { TextInputLined } from '@shared/components/text-input-lined/TextInputLined';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import React, { useRef, useState } from 'react';
import { TextInput as RNTextInput, TouchableOpacity, View } from 'react-native';
import { ReadOnlyStepValue } from '../../../components/ReadOnlyStepValue';
import { ValidationMessage } from '../../../components/ValidationMessage';

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
    return <ReadOnlyStepValue label="비밀번호" value={'•'.repeat(password.length)} />;
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
      <TextInputLined
        label="비밀번호"
        placeholder="비밀번호 입력 (8자 이상)"
        value={password}
        onChangeText={setPassword}
        onSubmitEditing={handlePasswordSubmit}
        returnKeyType="next"
        secureTextEntry={!showPassword}
        rightIcon={
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 4 }}>
            <Ionicons 
              name={showPassword ? 'eye' : 'eye-off'} 
              size={20} 
              color={Color.text.sub} 
            />
          </TouchableOpacity>
        }
      />

      {/* Password Hints */}
      <View style={{ marginTop: Layout.spacing.xs, marginBottom: Layout.spacing.l }}>
        <ValidationMessage message="• 8자리 이상 입력(영문/숫자)" type="info" />
        <ValidationMessage 
          message={`• ${isPasswordValid ? '사용가능한 비밀번호입니다.' : '사용 불가능한 비밀번호입니다.'}`}
          type={isPasswordValid ? 'success' : 'error'}
        />
      </View>

      <TextInputLined
        label="비밀번호 확인"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        onSubmitEditing={handleConfirmSubmit}
        returnKeyType="done"
        secureTextEntry={!showConfirmPassword}
        rightIcon={
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={{ padding: 4 }}>
            <Ionicons 
              name={showConfirmPassword ? 'eye' : 'eye-off'} 
              size={20} 
              color={Color.text.sub} 
            />
          </TouchableOpacity>
        }
      />

      {/* Confirm Match Status */}
      {confirmPassword.length > 0 && (
        <ValidationMessage 
          message={`• ${isConfirmMatch ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}`}
          type={isConfirmMatch ? 'success' : 'error'}
        />
      )}
    </View>
  );
}

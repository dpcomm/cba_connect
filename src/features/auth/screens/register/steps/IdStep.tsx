import { Button } from '@shared/components/button/Button';
import { Color } from '@shared/constants/color';
import { Font } from '@shared/constants/font';
import { Layout } from '@shared/constants/layout';
import React, { useState } from 'react';
import { TextInput as RNTextInput, View } from 'react-native';
import { ReadOnlyStepValue } from '../../../components/ReadOnlyStepValue';
import { StepLabel } from '../../../components/StepLabel';
import { ValidationMessage } from '../../../components/ValidationMessage';

interface Props {
  userId: string;
  setUserId?: (text: string) => void;
  onNext?: () => void;
  readOnly?: boolean;
  onCheckDuplicate?: (id: string) => Promise<boolean>;
}

export function IdStep({ userId, setUserId, onNext, readOnly, onCheckDuplicate }: Props) {
  const [checkStatus, setCheckStatus] = useState<'idle' | 'checking' | 'available' | 'duplicate'>('idle');

  if (readOnly) {
    return <ReadOnlyStepValue label="아이디" value={userId} />;
  }

  const handleDuplicateCheck = async () => {
    if (!userId.trim() || !onCheckDuplicate) {
      return;
    }
    setCheckStatus('checking');
    try {
      const isDuplicate = await onCheckDuplicate(userId);
      setCheckStatus(isDuplicate ? 'duplicate' : 'available');
    } catch (error) {
      console.error('ID check failed:', error);
      setCheckStatus('idle');
    }
  };

  const handleSubmit = () => {
    if (userId.trim().length > 0 && checkStatus === 'available' && onNext) {
      onNext();
    }
  };

  const handleChangeText = (text: string) => {
    const filteredText = text.replace(/[^a-z0-9]/g, '');
    setUserId?.(filteredText);
    // Reset check status when text changes
    if (checkStatus !== 'idle') {
      setCheckStatus('idle');
    }
  };

  return (
    <View style={{ width: '100%' }}>
      <StepLabel label="아이디" />
      <View style={{ 
        flexDirection: 'row',
        alignItems: 'center',
        gap: Layout.spacing.m,
      }}>
        <View style={{ 
          flex: 1,
          borderBottomWidth: 2, 
          borderBottomColor: Color.primary.main,
          paddingBottom: 4,
        }}>
          <RNTextInput
            placeholder="아이디를 입력해주세요"
            placeholderTextColor={Color.text.disabled}
            value={userId}
            onChangeText={handleChangeText}
            onSubmitEditing={handleSubmit}
            returnKeyType="next"
            autoCapitalize="none"
            style={{
              ...Font.heading3,
              color: Color.text.main,
              width: '100%',
              height: 40,
              textAlignVertical: 'center',
              includeFontPadding: false,
              paddingVertical: 0,
            }}
          />
        </View>
        <Button
          title={checkStatus === 'checking' ? '확인중...' : '중복체크'}
          onPress={handleDuplicateCheck}
          size="small"
          disabled={checkStatus === 'checking' || !userId.trim()}
          style={{
            borderRadius: Layout.radius.l,
            opacity: (!userId.trim() || checkStatus === 'checking') ? 0.5 : 1,
          }}
        />
      </View>
      {/* Status Message */}
      {checkStatus === 'available' && (
        <ValidationMessage message="• 사용가능한 아이디입니다." type="success" />
      )}
      {checkStatus === 'duplicate' && (
        <ValidationMessage message="중복된 아이디입니다." type="error" />
      )}
    </View>
  );
}

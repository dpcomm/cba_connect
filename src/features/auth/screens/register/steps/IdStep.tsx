import { Button } from '@shared/components/button/Button';
import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Font } from '@shared/constants/font';
import { Layout } from '@shared/constants/layout';
import React, { useState } from 'react';
import { TextInput as RNTextInput, View } from 'react-native';

interface Props {
  userId: string;
  setUserId?: (text: string) => void;
  onNext?: () => void;
  readOnly?: boolean;
}

export function IdStep({ userId, setUserId, onNext, readOnly }: Props) {
  const [checkStatus, setCheckStatus] = useState<'idle' | 'checking' | 'available' | 'duplicate'>('idle');

  if (readOnly) {
    return (
      <View style={{ marginBottom: Layout.spacing.l, gap: 10 }}>
        <ThemedText variant="text1" color={Color.text.sub}>아이디</ThemedText>
        <ThemedText variant="heading3">{userId}</ThemedText>
      </View>
    );
  }

  const handleDuplicateCheck = async () => {
    if (!userId.trim()) {
      return;
    }
    setCheckStatus('checking');
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Mock: IDs starting with 'test' are duplicates
    if (userId.toLowerCase().startsWith('test')) {
      setCheckStatus('duplicate');
    } else {
      setCheckStatus('available');
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
      <View style={{ marginBottom: 10 }}>
        <ThemedText variant="text1" color={Color.text.sub}>아이디</ThemedText>
      </View>
      <View style={{ 
        flexDirection: 'row',
        alignItems: 'center',
        gap: Layout.spacing.m,
      }}>
        <View style={{ 
          flex: 1,
          borderBottomWidth: 2, 
          borderBottomColor: Color.primary.main,
          paddingBottom: Layout.spacing.xs,
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
        <ThemedText variant="text4" color={Color.primary.main} style={{ marginTop: Layout.spacing.xs }}>
          • 사용가능한 아이디입니다.
        </ThemedText>
      )}
      {checkStatus === 'duplicate' && (
        <ThemedText variant="text4" color={Color.accents.pink} style={{ marginTop: Layout.spacing.xs }}>
          중복된 아이디입니다.
        </ThemedText>
      )}
    </View>
  );
}

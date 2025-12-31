import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Font } from '@shared/constants/font';
import { Layout } from '@shared/constants/layout';
import React, { useState } from 'react';
import { ActivityIndicator, TextInput as RNTextInput, TouchableOpacity, View } from 'react-native';

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
      <View style={{ marginBottom: Layout.spacing.l }}>
        <ThemedText variant="text3" color={Color.text.sub}>아이디</ThemedText>
        <ThemedText variant="heading3" style={{ marginTop: Layout.spacing.xs }}>{userId}</ThemedText>
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
    setUserId?.(text);
    // Reset check status when text changes
    if (checkStatus !== 'idle') {
      setCheckStatus('idle');
    }
  };

  return (
    <View style={{ width: '100%' }}>
      <ThemedText variant="text3" color={Color.text.sub} style={{ marginBottom: Layout.spacing.xs }}>아이디</ThemedText>
      <View style={{ 
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2, 
        borderBottomColor: Color.primary.main,
        paddingBottom: Layout.spacing.s,
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
            padding: 0,
            flex: 1,
          }}
        />
        <TouchableOpacity
          onPress={handleDuplicateCheck}
          disabled={checkStatus === 'checking' || !userId.trim()}
          style={{
            backgroundColor: Color.primary.main,
            paddingVertical: Layout.spacing.s,
            paddingHorizontal: Layout.spacing.m,
            borderRadius: Layout.radius.s,
            marginLeft: Layout.spacing.s,
            opacity: (!userId.trim() || checkStatus === 'checking') ? 0.5 : 1,
          }}
        >
          {checkStatus === 'checking' ? (
            <ActivityIndicator size="small" color={Color.text.white} />
          ) : (
            <ThemedText variant="text3" color={Color.text.white}>중복체크</ThemedText>
          )}
        </TouchableOpacity>
      </View>

      {/* Status Message */}
      {checkStatus === 'available' && (
        <ThemedText variant="text4" color="#007AFF" style={{ marginTop: Layout.spacing.xs }}>
          • 사용가능한 아이디입니다.
        </ThemedText>
      )}
      {checkStatus === 'duplicate' && (
        <ThemedText variant="text4" color="#FF3B30" style={{ marginTop: Layout.spacing.xs }}>
          • 중복된 아이디입니다.
        </ThemedText>
      )}
    </View>
  );
}

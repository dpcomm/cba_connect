import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface Props {
  gender: 'M' | 'F' | null;
  setGender?: (gender: 'M' | 'F' | null) => void;
  birthdate?: string;
  onNext?: () => void;
  readOnly?: boolean;
}

export function GenderStep({ gender, setGender, birthdate, onNext, readOnly }: Props) {
  if (readOnly) {
    const genderText = gender === 'M' ? '남자' : gender === 'F' ? '여자' : '선택안함';
    return (
      <View style={{ marginBottom: Layout.spacing.l }}>
        <ThemedText variant="text3" color={Color.text.sub}>성별</ThemedText>
        <View style={{ flexDirection: 'row', gap: Layout.spacing.s, marginTop: Layout.spacing.xs }}>
          <View style={{
            paddingVertical: Layout.spacing.s,
            paddingHorizontal: Layout.spacing.m,
            borderRadius: Layout.radius.s,
            backgroundColor: gender === 'M' ? Color.primary.main : '#999',
          }}>
            <ThemedText color={Color.text.white}>남자</ThemedText>
          </View>
          <View style={{
            paddingVertical: Layout.spacing.s,
            paddingHorizontal: Layout.spacing.m,
            borderRadius: Layout.radius.s,
            backgroundColor: gender === 'F' ? Color.primary.main : '#999',
          }}>
            <ThemedText color={Color.text.white}>여자</ThemedText>
          </View>
          <View style={{
            paddingVertical: Layout.spacing.s,
            paddingHorizontal: Layout.spacing.m,
            borderRadius: Layout.radius.s,
            backgroundColor: gender === null ? Color.primary.main : '#999',
          }}>
            <ThemedText color={Color.text.white}>선택안함</ThemedText>
          </View>
        </View>
        {birthdate && (
          <View style={{ marginTop: Layout.spacing.l }}>
            <ThemedText variant="text3" color={Color.text.sub}>생년월일</ThemedText>
            <ThemedText variant="heading3" style={{ marginTop: Layout.spacing.xs }}>{birthdate}</ThemedText>
          </View>
        )}
      </View>
    );
  }

  const handleSelect = (value: 'M' | 'F' | null) => {
    setGender?.(value);
    onNext?.();
  };

  return (
    <View>
      <ThemedText variant="text3" color={Color.text.sub} style={{ marginBottom: Layout.spacing.m }}>
        성별 (선택사항 / CBA 내 동명이인의 구별을 위해 사용됩니다.)
      </ThemedText>
      
      <View style={{ flexDirection: 'row', gap: Layout.spacing.m }}>
        <TouchableOpacity 
          style={{ 
            flex: 1, 
            paddingVertical: Layout.spacing.m, 
            alignItems: 'center', 
            borderRadius: Layout.radius.s,
            backgroundColor: gender === 'M' ? Color.primary.main : '#999',
          }}
          onPress={() => handleSelect('M')}
        >
          <ThemedText color={Color.text.white}>남자</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{ 
            flex: 1, 
            paddingVertical: Layout.spacing.m, 
            alignItems: 'center', 
            borderRadius: Layout.radius.s,
            backgroundColor: gender === 'F' ? Color.primary.main : '#999',
          }}
          onPress={() => handleSelect('F')}
        >
          <ThemedText color={Color.text.white}>여자</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{ 
            flex: 1, 
            paddingVertical: Layout.spacing.m, 
            alignItems: 'center', 
            borderRadius: Layout.radius.s,
            backgroundColor: gender === null ? Color.primary.main : '#999',
          }}
          onPress={() => handleSelect(null)}
        >
          <ThemedText color={Color.text.white}>선택안함</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

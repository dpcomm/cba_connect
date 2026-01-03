import { Button } from '@shared/components/button/Button';
import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import React from 'react';
import { View } from 'react-native';

interface Props {
  gender: 'M' | 'F' | null;
  setGender?: (gender: 'M' | 'F' | null) => void;
  birthdate?: string;
  onNext?: () => void;
  readOnly?: boolean;
}

export function GenderStep({ gender, setGender, birthdate, onNext, readOnly }: Props) {
  if (readOnly) {
    return (
      <View style={{ marginBottom: Layout.spacing.l, gap: 10 }}>
        <ThemedText variant="text1" color={Color.text.sub}>성별</ThemedText>
        <View style={{ flexDirection: 'row', gap: Layout.spacing.m }}>
          <Button 
            title="남자"
            size="small"
            disabled
            style={{ 
              flex: 1, 
              backgroundColor: gender === 'M' ? Color.primary.main : '#999',
              opacity: 1
            }}
          />
          <Button 
            title="여자"
            size="small"
            disabled
            style={{ 
              flex: 1, 
              backgroundColor: gender === 'F' ? Color.primary.main : '#999',
              opacity: 1
            }}
          />
          <Button 
            title="선택안함"
            size="small"
            disabled
            style={{ 
              flex: 1, 
              backgroundColor: gender === null ? Color.primary.main : '#999',
              opacity: 1
            }}
          />
        </View>
        {birthdate && (
          <View style={{ marginTop: Layout.spacing.l, gap: 10 }}>
            <ThemedText variant="text1" color={Color.text.sub}>생년월일</ThemedText>
            <ThemedText variant="heading3">{birthdate}</ThemedText>
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
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Layout.spacing.xs, marginBottom: 10 }}>
        <ThemedText variant="text1" color={Color.text.sub}>
          성별
        </ThemedText>
        <ThemedText variant="text5" color={Color.text.sub}>
          (선택사항 / CBA 내 동명이인의 구별을 위해 사용됩니다.)
        </ThemedText> 
      </View>

      
      <View style={{ flexDirection: 'row', gap: Layout.spacing.m }}>
        <Button 
          title="남자"
          size="small"
          onPress={() => handleSelect('M')}
          style={{ 
            flex: 1, 
            backgroundColor: gender === 'M' ? Color.primary.main : '#999' 
          }}
        />
        <Button 
          title="여자"
          size="small"
          onPress={() => handleSelect('F')}
          style={{ 
            flex: 1, 
            backgroundColor: gender === 'F' ? Color.primary.main : '#999' 
          }}
        />
        <Button 
          title="선택안함"
          size="small"
          onPress={() => handleSelect(null)}
          style={{ 
            flex: 1, 
            backgroundColor: gender === null ? Color.primary.main : '#999' 
          }}
        />
      </View>
    </View>
  );
}

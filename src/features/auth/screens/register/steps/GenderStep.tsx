import { Button } from '@shared/components/button/Button';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import React from 'react';
import { View } from 'react-native';
import { ReadOnlyStepValue } from '../../../components/ReadOnlyStepValue';
import { StepLabel } from '../../../components/StepLabel';

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
        <ReadOnlyStepValue label="성별">
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
        </ReadOnlyStepValue>
        {birthdate && (
          <ReadOnlyStepValue label="생년월일" value={birthdate} />
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
      <StepLabel 
        label="성별" 
        subLabel="(선택사항 / CBA 내 동명이인의 구별을 위해 사용됩니다.)" 
      />
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

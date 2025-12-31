import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Font } from '@shared/constants/font';
import { Layout } from '@shared/constants/layout';
import React, { useEffect, useState } from 'react';
import { TextInput as RNTextInput, TouchableOpacity, View } from 'react-native';

interface Props {
  affiliation: string;
  setAffiliation?: (text: string) => void;
  onNext?: () => void;
  readOnly?: boolean;
}

const STANDARD_GROUPS = [
  '권수영&임강미 M', 
  '배윤희&김준영 M', 
  '노시은&윤승오 M', 
  '가족실', 
  '새친구',
];

const OTHER_OPTION = '기타(선택입력)';

export function AffiliationStep({ affiliation, setAffiliation, onNext, readOnly }: Props) {
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customInput, setCustomInput] = useState('');

  // Sync customInput with affiliation if it's a custom value
  useEffect(() => {
    if (affiliation && !STANDARD_GROUPS.includes(affiliation) && affiliation !== OTHER_OPTION) {
      setIsCustomMode(true);
      setCustomInput(affiliation);
    }
  }, []);

  if (readOnly) {
    const displayValue = isCustomMode || (!STANDARD_GROUPS.includes(affiliation) && affiliation !== OTHER_OPTION) 
      ? affiliation 
      : affiliation;
    return (
      <View style={{ marginBottom: Layout.spacing.l }}>
        <ThemedText variant="text3" color={Color.text.sub}>중그룹</ThemedText>
        <ThemedText variant="heading3" style={{ marginTop: Layout.spacing.xs }}>{displayValue}</ThemedText>
      </View>
    );
  }

  const handleSelect = (group: string) => {
    if (group === OTHER_OPTION) {
      setIsCustomMode(true);
      setAffiliation?.(''); // Clear affiliation when switching to custom
    } else {
      setIsCustomMode(false);
      setCustomInput('');
      setAffiliation?.(group);
      onNext?.();
    }
  };

  const handleCustomSubmit = () => {
    if (customInput.trim().length > 0) {
      setAffiliation?.(customInput.trim());
      onNext?.();
    }
  };

  return (
    <View>
      <ThemedText variant="text3" color={Color.text.sub} style={{ marginBottom: Layout.spacing.m }}>
        내가 속한 중그룹을 선택해주세요.
      </ThemedText>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Layout.spacing.s }}>
        {STANDARD_GROUPS.map((group) => (
          <TouchableOpacity
            key={group}
            style={{
              paddingVertical: Layout.spacing.s,
              paddingHorizontal: Layout.spacing.m,
              borderRadius: Layout.radius.l,
              backgroundColor: affiliation === group && !isCustomMode ? Color.primary.main : '#999',
            }}
            onPress={() => handleSelect(group)}
          >
            <ThemedText color={Color.text.white}>{group}</ThemedText>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={{
            paddingVertical: Layout.spacing.s,
            paddingHorizontal: Layout.spacing.m,
            borderRadius: Layout.radius.l,
            backgroundColor: isCustomMode ? Color.primary.main : '#999',
          }}
          onPress={() => handleSelect(OTHER_OPTION)}
        >
          <ThemedText color={Color.text.white}>{OTHER_OPTION}</ThemedText>
        </TouchableOpacity>
      </View>

      {isCustomMode && (
        <View style={{ marginTop: Layout.spacing.l, width: '100%' }}>
          <ThemedText variant="text3" color={Color.text.sub} style={{ marginBottom: Layout.spacing.xs }}>소속 입력</ThemedText>
          <View style={{ 
            borderBottomWidth: 2, 
            borderBottomColor: Color.primary.main,
            paddingBottom: Layout.spacing.s,
          }}>
            <RNTextInput
              placeholder="소속을 입력해주세요"
              placeholderTextColor={Color.text.disabled}
              value={customInput}
              onChangeText={setCustomInput}
              onSubmitEditing={handleCustomSubmit}
              returnKeyType="next"
              autoFocus
              style={{
                ...Font.heading3,
                color: Color.text.main,
                padding: 0,
                width: '100%',
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
}

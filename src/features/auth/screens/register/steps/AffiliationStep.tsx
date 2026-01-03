import { Button } from '@shared/components/button/Button';
import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Font } from '@shared/constants/font';
import { Layout } from '@shared/constants/layout';
import React, { useEffect, useState } from 'react';
import { TextInput as RNTextInput, View } from 'react-native';

interface Props {
  affiliation: string;
  setAffiliation?: (text: string) => void;
  onNext?: () => void;
  readOnly?: boolean;
}

const STANDARD_GROUPS = [
  '권수영&임강미M', 
  '배윤희&김준영M', 
  '노시은&윤승오M', 
];

const OTHER_OPTION = '기타(선택입력)';

export function AffiliationStep({ affiliation, setAffiliation, onNext, readOnly }: Props) {
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customInput, setCustomInput] = useState('');

  useEffect(() => {
    if (affiliation && !STANDARD_GROUPS.includes(affiliation) && affiliation !== OTHER_OPTION) {
      setIsCustomMode(true);
      setCustomInput(affiliation);
    }
  }, []);

  if (readOnly) {
    const isStandard = STANDARD_GROUPS.includes(affiliation);
    const isFamily = affiliation === '가족실';
    const isNew = affiliation === '새친구';
    const isCustom = affiliation && !isStandard && !isFamily && !isNew;

    return (
      <View style={{ marginBottom: Layout.spacing.l, gap: 10 }}>
        <ThemedText variant="text1" color={Color.text.sub}>중그룹</ThemedText>
        <View style={{ gap: 7 }}>
          {STANDARD_GROUPS.map((group) => (
            <Button
              key={group}
              title={group}
              size="small"
              disabled
              style={{
                width: 180,
                borderRadius: Layout.radius.l,
                backgroundColor: affiliation === group ? Color.primary.main : '#999',
                opacity: 1
              }}
            />
          ))}
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Button
              title="가족실"
              size="small"
              disabled
              style={{
                width: 86,
                borderRadius: Layout.radius.l,
                backgroundColor: isFamily ? Color.primary.main : '#999',
                opacity: 1
              }}
            />
            <Button
              title="새친구"
              size="small"
              disabled
              style={{
                width: 86,
                borderRadius: Layout.radius.l,
                backgroundColor: isNew ? Color.primary.main : '#999',
                opacity: 1
              }}
            />
          </View>
          <Button
            title={OTHER_OPTION}
            size="small"
            disabled
            style={{
              width: 180,
              borderRadius: Layout.radius.l,
              backgroundColor: isCustom ? Color.primary.main : '#999',
              opacity: 1
            }}
          />
        </View>

        {isCustom && (
          <View style={{ marginTop: Layout.spacing.m, width: 180 }}>
            <View style={{ 
              borderBottomWidth: 2, 
              borderBottomColor: Color.primary.main,
              paddingBottom: 4,
            }}>
              <RNTextInput
                value={affiliation}
                editable={false}
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
          </View>
        )}
      </View>
    );
  }

  const handleSelect = (group: string) => {
    if (group === OTHER_OPTION) {
      setIsCustomMode(true);
      setAffiliation?.('');
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
      <View style={{ marginBottom: 10 }}>
        <ThemedText variant="text1" color={Color.text.sub}>
          중그룹
        </ThemedText>
      </View>
      <View style={{ gap: Layout.spacing.s }}>
        {STANDARD_GROUPS.map((group) => (
          <Button
            key={group}
            title={group}
            size="small"
            onPress={() => handleSelect(group)}
            style={{
              width: 180,
              borderRadius: Layout.radius.l,
              backgroundColor: affiliation === group && !isCustomMode ? Color.primary.main : '#999',
            }}
          />
        ))}
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button
            title="가족실"
            size="small"
            onPress={() => handleSelect('가족실')}
            style={{
              width: 86,
              borderRadius: Layout.radius.l,
              backgroundColor: affiliation === '가족실' && !isCustomMode ? Color.primary.main : '#999',
            }}
          />
          <Button
            title="새친구"
            size="small"
            onPress={() => handleSelect('새친구')}
            style={{
              width: 86,
              borderRadius: Layout.radius.l,
              backgroundColor: affiliation === '새친구' && !isCustomMode ? Color.primary.main : '#999',
            }}
          />
        </View>
        <Button
          title={OTHER_OPTION}
          size="small"
          onPress={() => handleSelect(OTHER_OPTION)}
          style={{
            width: 180,
            borderRadius: Layout.radius.l,
            backgroundColor: isCustomMode ? Color.primary.main : '#999',
          }}
        />
      </View>

      {isCustomMode && (
        <View style={{ marginTop: Layout.spacing.m, width: 180 }}>
          <View style={{ 
            borderBottomWidth: 2, 
            borderBottomColor: Color.primary.main,
            paddingBottom: Layout.spacing.s,
          }}>
            <RNTextInput
              placeholder="OO 예배당/교단교회 등"
              placeholderTextColor={Color.text.disabled}
              value={customInput}
              onChangeText={setCustomInput}
              onSubmitEditing={handleCustomSubmit}
              returnKeyType="next"
              autoFocus
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
        </View>
      )}
    </View>
  );
}

import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Font } from '@shared/constants/font';
import { Layout } from '@shared/constants/layout';
import React from 'react';
import { TextInput as RNTextInput, View } from 'react-native';

interface Props {
  name: string;
  setName?: (text: string) => void;
  onNext?: () => void;
  readOnly?: boolean;
}

export function NameStep({ name, setName, onNext, readOnly }: Props) {
  if (readOnly) {
    return (
      <View style={{ marginBottom: Layout.spacing.l }}>
        <ThemedText variant="text3" color={Color.text.sub}>이름</ThemedText>
        <ThemedText variant="heading3" style={{ marginTop: Layout.spacing.xs }}>{name}</ThemedText>
      </View>
    );
  }

  const handleSubmit = () => {
    if (name.trim().length > 0 && onNext) {
      onNext();
    }
  };

  return (
    <View style={{ width: '100%' }}>
      <ThemedText variant="text3" color={Color.text.sub} style={{ marginBottom: Layout.spacing.xs }}>이름</ThemedText>
      <View style={{ 
        borderBottomWidth: 2, 
        borderBottomColor: Color.primary.main,
        paddingBottom: Layout.spacing.s,
      }}>
        <RNTextInput
          placeholder="김땡땡"
          placeholderTextColor={Color.text.disabled}
          value={name}
          onChangeText={setName}
          onSubmitEditing={handleSubmit}
          returnKeyType="next"
          style={{
            ...Font.heading3,
            color: Color.text.main,
            padding: 0,
            width: '100%',
          }}
        />
      </View>
    </View>
  );
}

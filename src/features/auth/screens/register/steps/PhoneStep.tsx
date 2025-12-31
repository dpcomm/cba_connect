import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Font } from '@shared/constants/font';
import { Layout } from '@shared/constants/layout';
import React from 'react';
import { TextInput as RNTextInput, View } from 'react-native';

interface Props {
  phoneNumber: string;
  setPhoneNumber?: (text: string) => void;
  onNext?: () => void;
  readOnly?: boolean;
}

export function PhoneStep({ phoneNumber, setPhoneNumber, onNext, readOnly }: Props) {
  if (readOnly) {
    return (
      <View style={{ marginBottom: Layout.spacing.l }}>
        <ThemedText variant="text3" color={Color.text.sub}>전화번호</ThemedText>
        <ThemedText variant="heading3" style={{ marginTop: Layout.spacing.xs }}>{phoneNumber}</ThemedText>
      </View>
    );
  }

  const handleSubmit = () => {
    if (phoneNumber.length >= 10 && onNext) {
      onNext();
    }
  };

  return (
    <View style={{ width: '100%' }}>
      <ThemedText variant="text3" color={Color.text.sub} style={{ marginBottom: Layout.spacing.xs }}>전화번호</ThemedText>
      <View style={{ 
        borderBottomWidth: 2, 
        borderBottomColor: Color.primary.main,
        paddingBottom: Layout.spacing.s,
      }}>
        <RNTextInput
          placeholder="01011111111"
          placeholderTextColor={Color.text.disabled}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          onSubmitEditing={handleSubmit}
          returnKeyType="next"
          keyboardType="phone-pad"
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

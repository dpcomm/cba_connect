import { TextInputLined } from '@shared/components/text-input-lined/TextInputLined';
import { ThemedText } from '@shared/components/themed-text/ThemedText';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import React from 'react';
import { View } from 'react-native';

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
    <TextInputLined
      label="전화번호"
      placeholder="01011111111"
      value={phoneNumber}
      onChangeText={setPhoneNumber}
      onSubmitEditing={handleSubmit}
      returnKeyType="next"
      keyboardType="phone-pad"
    />
  );
}

import { TextInput } from '@shared/components/text-input/TextInput';
import { Color } from '@shared/constants/color';
import { Layout } from '@shared/constants/layout';
import { formatPhoneNumber } from '@shared/utils/format';
import React from 'react';
import { View } from 'react-native';

interface Props {
  name: string;
  setName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
}

export function FindIdTab({ name, setName, phone, setPhone }: Props) {
  return (
    <View style={{ flex: 1, padding: Layout.spacing.l, backgroundColor: Color.default.background }}>
      <TextInput
        placeholder="이름 입력"
        value={name}
        onChangeText={setName}
        containerStyle={{ marginBottom: Layout.spacing.m }}
      />
      <TextInput
        placeholder="010-1111-1111"
        value={phone}
        onChangeText={(text) => setPhone(formatPhoneNumber(text))}
        keyboardType="phone-pad"
      />
    </View>
  );
}

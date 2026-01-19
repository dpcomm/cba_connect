import { TextInputLined } from '@shared/components/text-input-lined/TextInputLined';
import { formatPhoneNumber } from '@shared/utils/format';
import React from 'react';
import { View } from 'react-native';
import { ReadOnlyStepValue } from '../../../components/ReadOnlyStepValue';
import { StepLabel } from '../../../components/StepLabel';

interface Props {
  phoneNumber: string;
  setPhoneNumber?: (text: string) => void;
  onNext?: () => void;
  readOnly?: boolean;
}

export function PhoneStep({ phoneNumber, setPhoneNumber, onNext, readOnly }: Props) {
  if (readOnly) {
    return <ReadOnlyStepValue label="전화번호" value={phoneNumber} />;
  }

  const handleSubmit = () => {
    const rawNumber = phoneNumber.replace(/-/g, '');
    if (rawNumber.length >= 10 && onNext) {
      onNext();
    }
  };

  const handleChangeText = (text: string) => {
    if (setPhoneNumber) {
      setPhoneNumber(formatPhoneNumber(text));
    }
  };

  return (
    <View style={{ width: '100%' }}>
      <StepLabel label="전화번호" />
      <TextInputLined
        placeholder="010-1111-1111"
        value={phoneNumber}
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmit}
        returnKeyType="next"
        keyboardType="phone-pad"
      />
    </View>
  );
}

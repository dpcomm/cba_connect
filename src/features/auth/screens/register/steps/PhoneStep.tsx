import { TextInputLined } from '@shared/components/text-input-lined/TextInputLined';
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
    if (phoneNumber.length >= 10 && onNext) {
      onNext();
    }
  };

  return (
    <View style={{ width: '100%' }}>
      <StepLabel label="전화번호" />
      <TextInputLined
        placeholder="01011111111"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        onSubmitEditing={handleSubmit}
        returnKeyType="next"
        keyboardType="phone-pad"
      />
    </View>
  );
}

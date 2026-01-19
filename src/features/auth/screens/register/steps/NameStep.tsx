import { TextInputLined } from '@shared/components/text-input-lined/TextInputLined';
import React from 'react';
import { View } from 'react-native';
import { ReadOnlyStepValue } from '../../../components/ReadOnlyStepValue';
import { StepLabel } from '../../../components/StepLabel';

interface Props {
  name: string;
  setName?: (text: string) => void;
  onNext?: () => void;
  readOnly?: boolean;
}

export function NameStep({ name, setName, onNext, readOnly }: Props) {
  if (readOnly) {
    return <ReadOnlyStepValue label="이름" value={name} />;
  }

  const handleSubmit = () => {
    if (name.trim().length > 0 && onNext) {
      onNext();
    }
  };

  return (
    <View style={{ width: '100%' }}>
      <StepLabel label="이름" />
      <TextInputLined
        placeholder="이름을 입력해주세요"
        value={name}
        onChangeText={setName}
        onSubmitEditing={handleSubmit}
        returnKeyType="next"
      />
    </View>
  );
}

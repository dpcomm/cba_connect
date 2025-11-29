import React from 'react';
import { Container, StyledInput } from './styles';

type TextInputBComponentProps = {
  placeHolder: string;
  getter: string
  setter: () => void;
  maxLength: number;
  type: string;
}

const TextInputB = ({ placeHolder, getter, setter, type, maxLength }: TextInputBComponentProps) => {
  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>, maxLength: number) => {
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.substr(0, maxLength);
    }
  };
  return (
    <Container>
      <StyledInput
        placeholder={placeHolder}
        value={getter}
        onChange={(e) => setter(e.target.value)}
        onInput={(e) => handleOnInput(e as React.ChangeEvent<HTMLInputElement>, maxLength)}
        type={type}
        maxLength={maxLength}
      />
    </Container>
  );
};

export default TextInputB;

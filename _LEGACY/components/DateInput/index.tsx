import React from 'react';
import { Container, StyledInput } from './styles';

interface DateInputProps {
  getter: string;
  setter: (value: string) => void;
}

const formatDateInput = (value: string) => {
  // 숫자만 추출
  const numbersOnly = value.replace(/[^\d]/g, '');

  if (numbersOnly.length <= 4) return numbersOnly;
  if (numbersOnly.length <= 6) return `${numbersOnly.slice(0, 4)}-${numbersOnly.slice(4)}`;
  return `${numbersOnly.slice(0, 4)}-${numbersOnly.slice(4, 6)}-${numbersOnly.slice(6, 8)}`;
};

const DateInput: React.FC<DateInputProps> = ({ getter, setter }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateInput(e.target.value);
    setter(formatted);
  };

  return (
    <Container>
    <StyledInput
        placeholder="YYYY-MM-DD"
        value={getter}
        onChange={handleChange}
        maxLength={10}
        type="text"
        inputMode="numeric"
    />
    </Container>
  );
};

export default DateInput;

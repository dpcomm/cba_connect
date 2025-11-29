import React, { useState } from 'react';
import { Container, StyledInput } from './styles';

interface PhoneInputProps {
getter: string;
setter: (value: string) => void;
}

const formatPhoneNumber = (value: string) => {
    if (!value) return value;
  
    // 숫자만 추출
    const phoneNumber = value.replace(/[^\d]/g, '');
  
    // 국내 표준 전화번호 길이 및 포맷 체크
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 8) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
  };
  

const PhoneInput: React.FC<PhoneInputProps> = ({ getter, setter }) => {
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value);
    setter(formattedPhoneNumber);
};

return (
    <Container>
    <StyledInput
        placeholder="연락처를 입력해주세요."
        value={getter}
        onChange={handleChange}
        maxLength={13}  // "010-0000-0000" 최대 13자
        type="text"
    />
    </Container>
);
};

export default PhoneInput;
  
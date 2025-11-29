import React, { useState } from 'react';
import { Container,StyledInput } from './styles';

interface IdnInputProps {
getter: string;
setter: (value: string) => void;
}

const formatIdnNumber = (value: string) => {
    if (!value) return value;
  
    // 숫자만 추출
    const IdnNumber = value.replace(/[^\d]/g, '');
  
    //  주민등록번호 길이 및 포맷 체크 {6}-{7}
    if (IdnNumber.length < 7) return IdnNumber;
    return `${IdnNumber.slice(0, 6)}-${IdnNumber.slice(6, 13)}`;
  };
  

const IdnInput: React.FC<IdnInputProps> = ({ getter, setter }) => {
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedIdnNumber = formatIdnNumber(event.target.value);
    setter(formattedIdnNumber);
};

return (
    <Container>
    <StyledInput
        placeholder="13자리"
        value={getter}
        onChange={handleChange}
        maxLength={14}  // "000000-0000000" 최대 13자
        type="text"
    />
    </Container>
);
};

export default IdnInput;
  
// src/pages/SupportPage.tsx
import React from 'react';
import {
  Container,
  Heading,
  Text,
  Email
} from './SupportView.styled';

const SupportView: React.FC = () => {
  return (
    <Container>
      <Heading>기술 지원 안내</Heading>
      <Text>
        서비스 이용 중 불편한 점이나 문의사항이 있으신 경우<br />
        아래 이메일로 언제든지 연락 주세요.
      </Text>
      <Email>
        📧 <a href="wjswps@gmail.com">wjswps@gmail.com</a>
      </Email>
    </Container>
  );
};

export default SupportView;
import { Title3, body3 } from '@styles/font';
import styled from 'styled-components';

// 모달 스타일 정의
export const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 382px;
  height: 412px;
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

export const ModalHeader = styled.div`
  display: flex;
  width: 100%;
  ${Title3};
`;

export const ModalBody = styled.div`
  display: flex;
  width: 100%;
  height: 282px;
  ${body3};
`;

export const ModalBottom = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
`;

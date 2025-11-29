import { EColor } from '@styles/color';
import { body1, body2, body3 } from '@styles/font';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: sticky;
  width: 100%;
  height: 58px;
  align-items: center;
  justify-content: space-between;
  padding: 0px 12px 0px 12px;
  top: 0;
  background-color: ${EColor.TEXT_200};
  z-index: 10;
  /* box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2); */
  user-select: none;
`;

export const Right = styled.div`
  display: flex;
`;

export const Left = styled.div`
  display: flex;
`;

export const LeftView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${body1};
  gap: 8px;
`;

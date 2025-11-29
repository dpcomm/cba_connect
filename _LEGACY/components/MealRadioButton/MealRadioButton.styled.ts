
import { EColor } from '@styles/color';
import { body2 } from '@styles/font';
import styled from 'styled-components';

export const MealGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

export const MealColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DateLabel = styled.div`
  ${body2}
  margin-bottom: 8px;
  user-select: none;
`;

export const MealButton = styled.button<{ $active: boolean, $disabled: boolean }>`
  width: 68px;
  padding: 5px;
  margin-bottom: 5px;
  ${body2};
  color: ${EColor.TEXT_200};
  background-color: ${({ $active, $disabled }) => $disabled ? EColor.TEXT_400 : $active ? EColor.COLOR_PRIMARY : EColor.COLOR_PRIMARY_SUB2};
  border: none;
  border-radius: 8px;
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
`;

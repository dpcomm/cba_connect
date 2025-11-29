import styled from 'styled-components';
import { EColor } from '@styles/color';
import { body1 } from '@styles/font';

export const RectSelectorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 8px;
  column-gap: 12px;
  width: 100%;
`;

export const RectButton = styled.button`
  padding: 10px;
  border: none;
//   background-color: ${props => props.disabled ? '#eee' : props.isActive ? EColor.COLOR_PRIMARY : '#ccc'};
  background-color: ${props => props.isSelected ? EColor.COLOR_PRIMARY : EColor.TEXT_500};
  color: ${props => props.disabled ? '#666' : 'black'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  ${body1}
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.disabled ? '#eee' : EColor.COLOR_SECONDARY};
  }
`;

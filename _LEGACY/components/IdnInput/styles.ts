import { EColor } from '@styles/color';
import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
  align-items: center;
  width: 100%;
  padding: 8px;
  border: 1px solid ${EColor.COLOR_PRIMARY};
  background-color: ${EColor.TEXT_200};
  border-radius: 8px;
  box-sizing: border-box;
`;

export const StyledInput = styled.input`
  width: 100%;
	height: 28px;
	font-size: 16px;
  padding: 10px;
  background-color: ${EColor.TEXT_200};
  color: ${EColor.TEXT_900};
  border: none;
  outline: none;
  &::placeholder {
    color: ${EColor.TEXT_600};
  }
`;
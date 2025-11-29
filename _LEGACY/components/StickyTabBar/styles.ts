import { EColor } from '@styles/color';
import { Title3 } from '@styles/font';
import styled from 'styled-components';

export const TabBar = styled.div`
	width: 100%;
  position: sticky;
	top: ${props => props.isTop ? '0' : 'auto'};
  bottom: ${props => props.isTop ? 'auto' : '0'};
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  z-index: 500;
`;

export const Tab = styled.div`
	width: 50%;
	align-items: center;
  display: inline-block;
  cursor: pointer;
  &:hover {
    color: #007bff;
  }
`;

export const TabButton = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 64px;
	${Title3}
	background-color: ${EColor.COLOR_PRIMARY};
	color: ${EColor.TEXT_200}
`;
import styled from 'styled-components';
import { EColor } from '@styles/color';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 8px;
  border: 1px solid ${EColor.COLOR_PRIMARY};
  background-color: ${EColor.TEXT_200};
  border-radius: 8px;
  box-sizing: border-box;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  height: 28px;
  background-color: ${EColor.TEXT_200};
  border: none;
  outline: none;
  color: ${EColor.TEXT_600};
  cursor: pointer;
  &:active {
    background-color: ${EColor.GRAY};
  }
  -webkit-tap-highlight-color: transparent !important;
`;

export const ListContainer = styled.div`
  position: absolute;
  width: 100%;
  top: calc(100% + 2px);
  padding: 0;
  margin: 0;
  background-color: ${EColor.TEXT_200};
  border: 1px solid ${EColor.COLOR_PRIMARY};
  border-top: none;
  z-index: 1000;
`;

export const List = styled.ul`
  padding-left: 0;
  margin: 0;
  list-style: none;
`;

export const ListItem = styled.li`
  padding: 10px;
  cursor: pointer;
  color: ${EColor.TEXT_600};
  -webkit-tap-highlight-color: transparent !important;
  &:hover {
    background-color: ${EColor.TEXT_200};
  }
  &:active {
    background-color: ${EColor.GRAY};
  }
`;

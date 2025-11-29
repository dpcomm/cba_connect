import { EColor } from '@styles/color';
import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
`;

export const NavbarBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding: 12px;
`;

export const NavbarItem = styled.div`
  display: flex;
  width: 78px;
  height: 70px;
  justify-content: center;
  align-items: center;
`;

export const TicketBox = styled.div`
  border: 1px dashed black;
  border-radius: 128px;
  padding: 10px;
`;

export const TicketBoxOn = styled.div`
  border: 1px dashed ${EColor.COLOR_INTERACTION};
  border-radius: 128px;
  padding: 10px;
`;

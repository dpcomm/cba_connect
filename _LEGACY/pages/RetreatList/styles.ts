import { EColor } from "@styles/color";
import { body3 } from "@styles/font";
import styled from "styled-components";


export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100dvh;
  flex-direction: column;
  align-items: center;
  padding: 12px 24px;
`;

export const ListView = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  width: 344px;
  overflow-y: scroll;
  gap: 12px;
`;

export const ListItemButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 166px;
  height: 166px;
  padding: 0;
  border: none;
  border-radius: 12px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1);
  }
`;


export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  display: block;

`;

export const InfoText = styled.div`
  display: flex;
  color: ${EColor.TEXT_600};
  ${body3};
  margin: 12px 0;
`;
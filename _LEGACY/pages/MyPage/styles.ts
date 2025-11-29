import { EColor } from "@styles/color";
import { Title5, body3 } from "@styles/font";
import styled from "styled-components";


export const Container = styled.div`
	display: flex;
	flex-direction: column;
  align-items: center;
	width: 100%;
  height: 100dvh;
  padding: 0px 24px 0px 24px;
	overflow-y: scroll;
  gap: 12px;
`;

export const ListItemButton = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid ${EColor.TEXT_400};
  border-width: 1.2px 0px 1.2px 0px;
  &:active {
    background-color: ${EColor.TEXT_400};
    color: ${EColor.TEXT_600};
    border-radius: 12px;
  }
  gap: 8px;
`;

export const VersionView = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  width: 100%;
  bottom: 0;
`;

export const Name = styled.div`
  color: ${EColor.COLOR_PRIMARY_SUB2};
  ${Title5};
`;

export const Version = styled.div`
  color: ${EColor.TEXT_600};
  ${body3};
`;
import styled from "styled-components";
import { Title4, body2 } from "@styles/font";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100dvh;
	align-items: center;
	padding: 24px;
`;

export const ListItemView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;


export const ListItemRight = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  text-align: end;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: column;
`;

export const ListItemTitle = styled.div`
  ${body2}
`;

export const ListItemSub = styled.div`
  ${Title4}
  font-size: 14px;
`;

export const ListItemDate = styled.div`
  ${body2}
  font-size: 14px;
`;
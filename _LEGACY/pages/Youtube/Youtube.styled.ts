import styled from "styled-components";
import { body1, Title2 } from "@styles/font";
import { EColor } from "@styles/color";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100dvh;
	align-items: center;
	padding: 24px;
`;

export const TextTitle  = styled.div`
  display: flex;
	width: 320px;
	${Title2}
	user-select: none;
`;

export const TextSub = styled.div`
  display: flex;
	${body1};
  color: ${EColor.TEXT_600};
	user-select: none;
`;

export const ItemView = styled.div`
  display: flex;
  justify-content: space-between;
  width: 320px;
`;

export const FooterView = styled.div`
  display: flex;
  position: absolute;
  bottom: 36px;
`;

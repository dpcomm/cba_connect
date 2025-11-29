import styled from "styled-components";
import { Title1, body1, body2 } from "@styles/font";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100dvh;
	align-items: center;
	padding: 42px;
`;

export const TextTitle  = styled.div`
  display: flex;
	margin-bottom: 24px;
	${Title1}
	font-size: 34px;
	letter-spacing: 2px;
	user-select: none;
`;

export const TextSub = styled.div`
  display: flex;
	${body1}
	font-size: 24px;
	letter-spacing: 2px;
	user-select: none;
`;

export const TextBody = styled.div`
  display: flex;
	${body2}
	font-size: 22px;
`;

export const ImageLocation = styled.img`
	width: 100%;
	padding-top: 24px;
	padding-bottom: 24px;
	user-select: none;
`;

export const ButtonView = styled.div`
	display: flex;
	padding: 46px;
`;
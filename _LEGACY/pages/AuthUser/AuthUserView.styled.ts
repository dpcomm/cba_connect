import { EColor } from "@styles/color";
import { Title1, Title4_2, body4 } from "@styles/font";
import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	height: 100dvh;
	text-align: center;
`;

export const LogoImage = styled.img`
	width: 100%;
`;

export const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	padding-right: 32px;
	padding-left: 32px;
	gap: 28px;
`;

export const TextTitle  = styled.div`
  display: flex;
	padding: 46px;
	${Title1}
	font-size: 34px;
	letter-spacing: 2px;
	user-select: none;
`;

export const InputBox = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;

export const TextForm = styled.div`
	display: flex;
	justify-content: center;
	width: 118px;
	margin-right: 12px;
	${Title4_2}
	letter-spacing: 2px;
	user-select: none;
`;

export const TextFormLight = styled.div`
	display: flex;
	justify-content: center;
	width: 118px;
	margin-right: 12px;
	${Title4_2}
	color: ${EColor.TEXT_500};
	letter-spacing: 2px;
	user-select: none;
`;

export const TextSub = styled.div`
	${body4}
	color: ${EColor.TEXT_500};
`;

export const CarIdInputView = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;
import { EColor } from "@styles/color";
import { Title1, Title4_2, body2, body4 } from "@styles/font";
import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 480px;
	height: 100dvh;
	text-align: center;
`;

export const MealButton = styled.button`
  width: 68px;
  padding: 5px;
  margin-bottom: 5px;
  ${body2};
  color: ${EColor.TEXT_200};
  background-color: ${EColor.COLOR_PRIMARY};
  border: none;
  border-radius: 8px;
`;

export const MealButtonFalse = styled.button`
  width: 68px;
  padding: 5px;
  margin-bottom: 5px;
  ${body2};
  color: ${EColor.TEXT_200};
  background-color: ${EColor.COLOR_PRIMARY_SUB2};
  border: none;
  border-radius: 8px;
`;

export const LogoImage = styled.img`
	width: 100%;
`;

export const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	padding: 32px 32px 32px 32px;
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
	flex-direction: column;
	width: 118px;
	margin-right: 12px;
	${Title4_2}
	letter-spacing: 2px;
	user-select: none;
	gap: 8px;
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
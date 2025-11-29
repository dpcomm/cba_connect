import styled from "styled-components";
import { EColor } from "@styles/color";
import { Title3, Title6, body1, body2, body3, body4, body6 } from "@styles/font";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100dvh;
	justify-content: center;
	align-items: center;
	padding-right: 42px;
	padding-left: 42px;
`;

export const LogoView = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
`;

export const LogoLight = styled.div`
	${Title6};
	font-size: 38px;
	color: ${EColor.COLOR_PRIMARY_SUB2};
	letter-spacing: 2px;
	user-select: none;
`;

export const LogoBold = styled.div`
	${Title3}
	font-size: 64px;
	color: ${EColor.COLOR_PRIMARY};
	letter-spacing: 7px;
	margin-top: -16px;
	user-select: none;
`;

export const LoginInputView = styled.div`
	width: 100%;
	margin-top: 24px;
`;

export const TextButtonView = styled.div`
	width: 100%;
	margin-top: 36px;
`;

export const TextButton = styled.div`
	display: flex;
	width: 100%;
	margin: 8px;
	${body3};
	color: ${EColor.TEXT_600};
	justify-content: center;
	align-items: center;
`;

export const NameText = styled.div`
	${body1};
	font-size: 24px;
	color: ${EColor.TEXT_900};
	letter-spacing: 2px;
	padding-top: 36px;
	padding-bottom: 36px;
`;

export const DDayView = styled.div`
	padding-bottom: 32px;
`;

export const DDayTest = styled.div`
	${body1};
	font-size: 40px;
	letter-spacing: 2px;
	color: ${EColor.TEXT_900};
`;

export const MenuView = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const ItemView = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 36px;
`;

export const ItemText = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	${body4};
	color: ${EColor.TEXT_500};
	margin-top: 10px;
	text-align: center;
`;

export const Line = styled.div`
	display: flex;
	background-color: ${EColor.TEXT_500};
	width: 1px;
	height: 64px;
	border-radius: 12px;
`;

export const CheckBox = styled.div`
	display: flex;
	align-items: center;
	padding: 12px;
	color: ${EColor.TEXT_500};
	display: flex;
	width: 100%;
	${body2};
	gap: 4px;
	user-select: none;
`;
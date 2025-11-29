import { EColor } from "@styles/color";
import { Title6, body1, body2, body5, } from "@styles/font";
import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 460px;
	height: 100dvh;
	text-align: center;
	margin-bottom: 84px;
`;

export const LogoImage = styled.img`
	width: 100%;
`;

export const LogoText = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	${Title6};
	font-size: 36px;
	color: ${EColor.TEXT_900};
	letter-spacing: 2px;
	padding-top: 48px;
	padding-bottom: 48px;
`;

export const Left = styled.div`
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
	width: 100%;
	${body2}
	letter-spacing: 2px;
	color: #1F9EDD;
	margin-bottom: 60px;
	padding: 4px;
	gap: 4px;
	user-select: none;
	&:active {
    background-color: ${EColor.TEXT_400};
    color: ${EColor.TEXT_600};
    border-radius: 12px;
  }
`;

export const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	gap: 12px;
	user-select: none;
`;

export const TextTitle = styled.div`
	${body1};
	font-size: 20px;
	color: ${EColor.TEXT_800};
	letter-spacing: 2px;
`;

export const TextBody = styled.div`
	${body5};
	font-size: 12px;
	color: ${EColor.TEXT_800};
	letter-spacing: 2px;
`;

export const RetreatGuideBookTitle = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 106px;
	height: 28px;
	background-color: #87D5F2;
	color: ${EColor.TEXT_200};
	border-radius: 8px;
`;
import styled from "styled-components";
import { body1, body2 } from "@styles/font";
import { EColor } from "@styles/color";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100dvh;
	align-items: center;
	padding: 42px;
`;

export const PaymentView = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 52px;
  padding-bottom: 52px;
  user-select: none;
`;

export const TextPayment = styled.div`
  ${body1}
  color: ${EColor.COLOR_PRIMARY_SUB1};
  font-size: 42px;
`;

export const TextPaymentSub = styled.div`
  ${body1}
  color: ${EColor.TEXT_500};
  font-size: 42px;
`;

export const TextPaymentBody = styled.div`
  ${body2};
  color: ${EColor.TEXT_500};
`;

export const TextBody = styled.div`
  display: flex;
  font-size: 22px;
  letter-spacing: 2px;
  user-select: none;
`;

export const TextBodyUnderLine = styled.div`
  display: flex;
  ${body2}
  letter-spacing: 2px;
  text-decoration: underline;
`;

export const ButtonView = styled.div`
	display: flex;
	padding: 46px;
`;
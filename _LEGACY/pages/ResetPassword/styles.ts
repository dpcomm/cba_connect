import styled from "styled-components";
import { EColor } from "@styles/color";
import { body1, body3, body4, Title1 } from "@styles/font";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 24px;
  background-color: ${EColor.TEXT_200};
  overflow-y: scroll;
`;

export const Title = styled.h1`
  ${Title1}
  color: ${EColor.COLOR_PRIMARY};
  margin-bottom: 16px;
`;

export const SubTitle = styled.h2`
  color: ${EColor.TEXT_600};
  ${body1}
  margin-bottom: 32px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin-bottom: 16px;
`;

export const StyledLabel = styled.label`
  ${body3}
  color: ${EColor.TEXT_600};
  margin-bottom: 8px;
`;

export const ErrorMessage = styled.div`
  color: ${EColor.RED};
  font-size: 14px;
  margin-bottom: 16px;
`;

export const GroupInputView = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const TextSub = styled.div`
  margin: 4px 0;
	text-align: left;
	color: ${EColor.TEXT_500};
	${body4}
`;
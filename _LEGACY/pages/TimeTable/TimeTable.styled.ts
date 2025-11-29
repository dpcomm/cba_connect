import { EColor } from "@styles/color";
import { Title1 } from "@styles/font";
import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100dvh;
	align-items: center;
	padding: 24px;
  gap: 8px;
`;

export const Title = styled.h1`
  margin-bottom: 12px;
  color: ${EColor.TEXT_900};
  ${Title1}
`;
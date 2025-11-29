import { EColor } from "@styles/color";
import { Title1, body1 } from "@styles/font";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const TitleText = styled.div`
  color: ${EColor.COLOR_PRIMARY};
  ${Title1};
  padding: 4px;
`;

export const TitleSubText = styled.div`
  color: ${EColor.TEXT_600};
  ${body1};
`;

export const Body = styled.div`
  text-align: center;
  padding: 48px;
  ${body1};
`;

export const StyledImage = styled.img`
  width: 256px;
`;

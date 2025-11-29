import { EColor } from "@styles/color";
import { body3 } from "@styles/font";
import styled from "styled-components";

export const Button = styled.button<{ clicked: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: row;
  background-color: ${({ clicked }) => (clicked ? EColor.TEXT_300 : EColor.TEXT_400)};
  padding: 12px;
  border: none;
  cursor: pointer;
  width: 100%;
  height: 44px;
  ${body3}
  color: ${EColor.TEXT_700};
  gap: 12px;

  &:hover {
    background-color: ${({ clicked }) => (clicked ? EColor.TEXT_500 : EColor.TEXT_300)};
  }
  &:active {
    background-color: ${({ clicked }) => (clicked ? EColor.TEXT_300 : EColor.TEXT_400)};
  }
`;
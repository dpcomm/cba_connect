import { EColor } from "@styles/color";
import { body1 } from "@styles/font";
import styled from "styled-components";

export const RadioWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 2px;
  column-gap: 44px;
  width: 100%;

  input {
    border: 0;
    clip: rect(0 0 0 0);
    height: 0px;
    margin: -1px;
    padding: 0;
    width: 1px;
  }
`;

export const CustomLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RadioView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-right: 8px;
  color: ${props => props.isSelected ? EColor.COLOR_PRIMARY : EColor.TEXT_500};
  ${body1}
  gap: 8px;
  letter-spacing: 2px;
`;
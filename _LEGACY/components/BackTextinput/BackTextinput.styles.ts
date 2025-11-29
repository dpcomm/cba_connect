import styled from "styled-components";
import { EColor } from "@styles/color";
import { body3 } from "@styles/font";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 412px;
  padding: 12px;
  border-radius: 20px;
  gap: 12px;
  background-color: ${EColor.TEXT_400};
  user-select: none;
`;

export const StyledInput = styled.input`
  display: flex;
  width: 100%;
  border: none;
  outline: none;
  background-color: ${EColor.TEXT_400};
  color: ${EColor.TEXT_600};
  ${body3}
  &::placeholder {
    color: ${EColor.TEXT_600};
  }
`;
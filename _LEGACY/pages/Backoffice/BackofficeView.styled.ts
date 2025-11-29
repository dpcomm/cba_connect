import { EColor } from "@styles/color";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding-top: 24px;
  padding-bottom: 24px;
  padding: 24px 32px;
  background-color: ${EColor.TEXT_400};
  color: ${EColor.TEXT_700};
  text-align: center;
  width: 242px;
  height: 100vh;
`;

export const TopView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 34px;
`;

export const BackItemButtonContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  padding-top: 14px;
  padding-bottom: 14px;
  &:before, &:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    border-bottom: 1.18px solid ${EColor.TEXT_700};

    transform: translateY(-50%);
  }

  &:before {
    top: 0;
  }

  &:after {
    bottom: 0;
  }
`;

export const BackButtonContainer = styled.div`
  position: fixed;
  bottom: 10px; /* 하단에 고정 */
  left:5%;
  transform: translateX(-50%);
`;

import { createGlobalStyle, styled } from "styled-components";
import NotoSansBlack from "@assets/fonts/NotoSans-Black.woff2";
import NotoSansBold from "@assets/fonts/NotoSans-Bold.woff2";
import NotoSansLight from "@assets/fonts/NotoSans-Light.woff2";
import NotoSansMedium from "@assets/fonts/NotoSans-Medium.woff2";
import NotoSansRegular from "@assets/fonts/NotoSans-Regular.woff2";
import NotoSansThin from "@assets/fonts/NotoSans-Thin.woff2";
import { body6 } from "./font";

export const GlobalStyle = createGlobalStyle`
  * {
    overscroll-behavior-y: none;
    box-sizing: border-box;
    margin: 0;
  }
  html {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 768px) {
    html {
      display: block;
    }
  }
  @font-face {
    font-family: 'NotoSansBlack';
    src: local('NotoSansBlack'), local('NotoSansBlack');
    font-style: normal;
    src: url(${NotoSansBlack}) format('truetype');
  }
  @font-face {
    font-family: 'NotoSansBold';
    src: local('NotoSansBold'), local('NotoSansBold');
    font-style: normal;
    src: url(${NotoSansBold}) format('truetype');
  }
  @font-face {
    font-family: 'NotoSansLight';
    src: local('NotoSansLight'), local('NotoSansLight');
    font-style: normal;
    src: url(${NotoSansLight}) format('truetype');
  }
  @font-face {
    font-family: 'NotoSansMedium';
    src: local('NotoSansMedium'), local('NotoSansMedium');
    font-style: normal;
    src: url(${NotoSansMedium}) format('truetype');
  }
  @font-face {
    font-family: 'NotoSansRegular';
    src: local('NotoSansRegular'), local('NotoSansRegular');
    font-style: normal;
    src: url(${NotoSansRegular}) format('truetype');
  }
  @font-face {
    font-family: 'NotoSansThin';
    src: local('NotoSansThin'), local('NotoSansThin');
    font-style: normal;
    src: url(${NotoSansThin}) format('truetype');
  }
`;

export const Version = styled.div`
  position: absolute;
  z-index: 998;
  bottom: 0;
  left: 0;
  ${body6}
`;